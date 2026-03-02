document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ANTI-AI & SCREENSHOT SECURITY
    // ==========================================
    
    // Blurs the screen if the user triggers a system overlay (screenshot menu/notifications)
    window.addEventListener('blur', () => {
        document.body.style.filter = 'blur(25px) grayscale(1)';
        console.log("Security Alert: View blurred to prevent capture.");
    });

    // Restores view when they return to the app
    window.addEventListener('focus', () => {
        document.body.style.filter = 'none';
    });

    // Prevents "Right Click" or "Long Press" to copy text or save images
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Block PrintScreen Key for Laptops
    window.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('Screenshots are disabled for this exam.');
            alert('Screenshot attempt detected. This action is not allowed.');
        }
    });

    // ==========================================
    // 2. REUSABLE HELPERS
    // ==========================================
    function validateTable(prefix, correctLBs, correctCFs) {
        let isCorrect = true;
        for (let i = 0; i < 5; i++) {
            const lb = document.getElementById(`${prefix}-lb-${i}`);
            const cf = document.getElementById(`${prefix}-cf-${i}`);
            if (parseFloat(lb.value) !== correctLBs[i] || parseInt(cf.value) !== correctCFs[i]) {
                isCorrect = false; lb.style.borderColor = "red"; cf.style.borderColor = "red";
            } else {
                lb.style.borderColor = "#4CAF50"; cf.style.borderColor = "#4CAF50";
            }
        }
        return isCorrect;
    }

    function lockTable(prefix) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`${prefix}-lb-${i}`).disabled = true;
            document.getElementById(`${prefix}-cf-${i}`).disabled = true;
        }
    }

    // ==========================================
    // 3. GUIDED PRACTICE 1: D6 (Exam Scores)
    // ==========================================
    const qLBs = [40.5, 30.5, 20.5, 10.5, 0.5];
    const qCFs = [40, 35, 23, 8, 2];

    document.getElementById('btn-d-table').addEventListener('click', () => {
        if (validateTable('d', qLBs, qCFs)) { 
            document.getElementById('d-err-table').style.display = 'none';
            document.getElementById('d-step2').classList.remove('hidden-view');
            lockTable('d'); 
            document.getElementById('btn-d-table').disabled = true;
        } else { document.getElementById('d-err-table').style.display = 'block'; }
    });

    document.getElementById('btn-d-pos').addEventListener('click', () => {
        if (parseFloat(document.getElementById('d-pos').value) === 24) { 
            document.getElementById('d-err-pos').style.display = 'none';
            document.getElementById('d-step3').classList.remove('hidden-view');
            document.getElementById('d6-row').classList.add('highlight-row'); 
            document.getElementById('btn-d-pos').disabled = true;
        } else { document.getElementById('d-err-pos').style.display = 'block'; }
    });

    document.getElementById('btn-d-vars').addEventListener('click', () => {
        const lb=document.getElementById('d-lb-var').value, cfb=document.getElementById('d-cfb').value, f=document.getElementById('d-f').value, i=document.getElementById('d-i').value;
        if (lb == 30.5 && cfb == 23 && f == 12 && i == 10) {
            document.getElementById('d-err-vars').style.display = 'none';
            document.getElementById('d-step4').classList.remove('hidden-view');
            document.getElementById('btn-d-vars').disabled = true;
        } else { document.getElementById('d-err-vars').style.display = 'block'; }
    });

    document.getElementById('btn-d-final').addEventListener('click', () => {
        const ans = document.getElementById('d-final').value;
        if (ans == 31.33 || ans == 31.3) {
            document.getElementById('d2-container').classList.remove('hidden-view');
            document.getElementById('btn-d-final').disabled = true;
            document.getElementById('d2-container').scrollIntoView({ behavior: 'smooth' });
        } else { document.getElementById('d-err-final').style.display = 'block'; }
    });

    // ==========================================
    // 4. GUIDED PRACTICE 2: D8 (Employee Ages)
    // ==========================================
    const d2LBs = [50.5, 40.5, 30.5, 20.5, 10.5];
    const d2CFs = [60, 55, 40, 20, 8];

    document.getElementById('btn-d2-table').addEventListener('click', () => {
        if (validateTable('d2', d2LBs, d2CFs)) {
            document.getElementById('d2-err-table').style.display = 'none';
            document.getElementById('d2-step2').classList.remove('hidden-view');
            lockTable('d2');
            document.getElementById('btn-d2-table').disabled = true;
        } else { document.getElementById('d2-err-table').style.display = 'block'; }
    });

    document.getElementById('btn-d2-pos').addEventListener('click', () => {
        if (parseFloat(document.getElementById('d2-pos').value) === 48) { 
            document.getElementById('d2-err-pos').style.display = 'none';
            document.getElementById('d2-step3').classList.remove('hidden-view');
            document.getElementById('d8-row').classList.add('highlight-row'); 
            document.getElementById('btn-d2-pos').disabled = true;
        } else { document.getElementById('d2-err-pos').style.display = 'block'; }
    });

    document.getElementById('btn-d2-vars').addEventListener('click', () => {
        const lb=document.getElementById('d2-lb-var').value, cfb=document.getElementById('d2-cfb').value, f=document.getElementById('d2-f').value, i=document.getElementById('d2-i').value;
        if (lb == 40.5 && cfb == 40 && f == 15 && i == 10) {
            document.getElementById('d2-err-vars').style.display = 'none';
            document.getElementById('d2-step4').classList.remove('hidden-view');
            document.getElementById('btn-d2-vars').disabled = true;
        } else { document.getElementById('d2-err-vars').style.display = 'block'; }
    });

    document.getElementById('btn-d2-final').addEventListener('click', () => {
        const ans = parseFloat(document.getElementById('d2-final').value);
        if (ans == 45.83 || ans == 45.8) {
            document.getElementById('d-quiz-container').classList.remove('hidden-view');
            document.getElementById('btn-d2-final').disabled = true;
            document.getElementById('d-quiz-container').scrollIntoView({ behavior: 'smooth' });
        } else { document.getElementById('d2-err-final').style.display = 'block'; }
    });

    // ==========================================
    // 5. DECILES 15-ITEM QUIZ LOGIC
    // ==========================================
    const decilesQuizData = [
        { q: "Deciles divide the dataset into how many equal parts?", options: ["4", "10", "100"], correct: 1 },
        { q: "What percentage of data falls below D1?", options: ["10%", "20%", "25%"], correct: 0 },
        { q: "Which decile is equivalent to the Median?", options: ["D2", "D5", "D10"], correct: 1 },
        { q: "What is the formula to find the position of D7?", options: ["7N / 10", "7N / 4", "7N / 100"], correct: 0 },
        { q: "If N=50, what is the position of D2?", options: ["5", "10", "20"], correct: 1 },
        { q: "If N=120, what is the position of D9?", options: ["90", "108", "110"], correct: 1 },
        { q: "What does 'k' represent in the Decile formula?", options: ["The specific decile number", "The total frequency", "The interval size"], correct: 0 },
        { q: "In the decile formula, what denominator is used?", options: ["4", "10", "100"], correct: 1 },
        { q: "Is D5 equal to Q2?", options: ["Yes", "No"], correct: 0 },
        { q: "What percentage of the data is ABOVE D8?", options: ["80%", "20%", "10%"], correct: 1 },
        { q: "If the position is 35, and <cf column contains 20, 30, 45. Which is the decile class?", options: ["<cf 30", "<cf 45", "<cf 20"], correct: 1 },
        { q: "What does f_Dk mean?", options: ["Frequency of the class before", "Frequency of the decile class", "Cumulative frequency"], correct: 1 },
        { q: "D2 separates the lowest 20% from the upper...", options: ["80%", "50%", "20%"], correct: 0 },
        { q: "Can we find D10 using the standard formula?", options: ["Yes", "No, D9 is the highest"], correct: 1 },
        { q: "If the position falls exactly on a <cf value, what is the decile class?", options: ["The class above it", "The class with that exact <cf", "The class below it"], correct: 1 }
    ];

    const quizWrapper = document.getElementById('deciles-quiz-wrapper');
    decilesQuizData.forEach((item, index) => {
        let qHtml = `<div class="question-card" style="user-select:none;">
            <p><strong>${index + 1}. ${item.q}</strong></p>
            ${item.options.map((opt, i) => `
                <label><input type="radio" name="dq${index}" value="${i}"> ${opt}</label>
            `).join('')}
        </div>`;
        quizWrapper.innerHTML += qHtml;
    });

    document.getElementById('btn-d-quiz').addEventListener('click', () => {
        let score = 0;
        decilesQuizData.forEach((item, index) => {
            const selected = document.querySelector(`input[name="dq${index}"]:checked`);
            if (selected && parseInt(selected.value) === item.correct) score++;
        });

        if (score >= 12) {
            document.getElementById('module-complete').classList.remove('hidden-view');
            document.getElementById('btn-d-quiz').disabled = true;
            document.getElementById('d-err-quiz').style.display = 'none';
        } else {
            const err = document.getElementById('d-err-quiz');
            err.style.display = 'block';
            err.innerText = `Score: ${score}/15. You need 12 to pass. Try again!`;
        }
    });
});