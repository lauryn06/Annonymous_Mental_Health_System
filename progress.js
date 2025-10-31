const moodForm = document.getElementById('mood-form');
const moodLogs = document.getElementById('mood-logs');

let moodData = []; // Store moods {date, value}

// Initialize Chart.js
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Mood Over Time',
            data: [],
            backgroundColor: 'rgba(108, 99, 255, 0.2)',
            borderColor: 'rgba(108, 99, 255, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        const moods = ["😢","😔","😐","🙂","😊"];
                        return moods[value-1];
                    }
                }
            }
        }
    }
});

function updateLogs() {
    moodLogs.innerHTML = '';
    moodData.slice().reverse().forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: ${["","😢","😔","😐","🙂","😊"][entry.value]}`;
        moodLogs.appendChild(li);
    });
}

function updateChart() {
    moodChart.data.labels = moodData.map(e => e.date);
    moodChart.data.datasets[0].data = moodData.map(e => e.value);
    moodChart.update();
}

moodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('mood-date').value;
    const value = parseInt(document.getElementById('mood-value').value);

    if(date && value) {
        moodData.push({date, value});
        updateLogs();
        updateChart();
        moodForm.reset();
    }
});
