const randomStudent = document.getElementById('random-student'); // Получаем окно
const button = document.getElementById('button'); // Получение значения кнопки

// Список учеников
const students = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "David Wilson",
    "Sophia Brown",
    "Olivia Taylor",
    "Daniel Miller",
    "William Anderson",
    "Emma Watson"
];

let currentIndex = Math.floor(Math.random() * students.length);
let studentElement;

// Функция запуска прокрутки
function startScroll(isAutomatic) {
    let time, _class;
    if (isAutomatic) {
        time = 1000;
        _class = 'student'
    } else {
        randomStudent.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.2)';
        time = 500;
        _class = 'student active'
    }

    randomStudent.innerHTML = "";
    students.forEach(student => {
        const studentDiv = document.createElement("div");
        studentDiv.className = _class;
        studentDiv.innerText = student;
        studentDiv.style.opacity = '0';
        studentDiv.style.transform = 'translateY(-200%) rotateX(90deg)';
        randomStudent.appendChild(studentDiv);
    });

    studentElement = document.querySelectorAll('.student');
    
    interval = setInterval(() => {
        if (currentIndex == 0) studentElement[students.length-1].style.transform = 'translateY(-200%) rotateX(90deg)';
        else studentElement[currentIndex-1].style.transform = 'translateY(-200%) rotateX(90deg)';
        studentElement[currentIndex].style.transform = 'translateY(100%) rotateX(90deg)';
        studentElement[currentIndex].style.opacity = '0';
        
        currentIndex = (currentIndex + 1) % studentElement.length;
        
        studentElement[currentIndex].style.transform = 'translateY(-50%) rotateX(0deg)';
        studentElement[currentIndex].style.opacity = '1';
    }, time);
}

// Функция остановки прокрутки
function stopScroll() {
    clearInterval(interval);

    const finalName = document.createElement('div');
    finalName.style.transform = 'translateY(-200%) rotateX(90deg)';
    finalName.style.opacity = '0';
    finalName.className = "final-student";
    finalName.innerText = students[Math.floor(Math.random() * students.length)];
    randomStudent.appendChild(finalName);

    setTimeout(() => {
        studentElement[currentIndex].style.transform = 'translateY(100%) rotateX(90deg)';
        studentElement[currentIndex].style.opacity = '0';
        console.log(currentIndex);

        finalName.style.transform = 'translateY(-50%) rotateX(0deg)';
        finalName.style.opacity = '1';

        button.innerHTML = 'Выбрать случайного ученика';
    }, 500)
}

// Обработчик нажатия на кнопку
button.addEventListener('click', () => {
    clearInterval(interval);

    button.disabled = true;
    button.innerHTML = '...';

    startScroll(false);

    setTimeout(() => {
        stopScroll();
        button.disabled = false;
    }, 3500)
});

startScroll(true);