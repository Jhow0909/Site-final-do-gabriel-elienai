const themeToggle = document.querySelector("#themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☾" : "☀";
});

const questions = [
  {question:"Qual é o meu time?",answers:["Grêmio","Internacional","Corinthians","Flamengo"],correct:1},
  {question:"Em qual cidade eu moro?",answers:["Curitiba","Londrina","Paranaguá","Maringá"],correct:2},
  {question:"Qual jogo eu gosto de jogar?",answers:["Roblox","Xadrez online","The Sims","FIFA apenas"],correct:0},
  {question:"Qual é minha série favorita?",answers:["Stranger Things","Breaking Bad","The Office","Round 6"],correct:1},
  {question:"Qual profissão quero seguir?",answers:["Médico","Advogado","Engenheiro elétrico","Chef"],correct:2},
  {question:"Quem é o melhor humano já existente na Terra?",answers:["Pelé","Ayrton Senna","Xuxa","Jhow Brondani"],correct:3}
];

let currentQuestion = 0;
let score = 0;
let answered = false;
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextButton");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const scoreText = document.querySelector("#scoreText");

function showQuestion(){
  answered = false;
  const item = questions[currentQuestion];
  questionElement.textContent = item.question;
  progressText.textContent = `Pergunta ${currentQuestion+1} de ${questions.length}`;
  progressBar.style.width = `${((currentQuestion+1)/questions.length)*100}%`;
  feedbackElement.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length-1 ? "Finalizar" : "Próxima";
  answersElement.innerHTML = "";
  item.answers.forEach((answer,index)=>{
    const button = document.createElement("button");
    button.className = "resposta";
    button.textContent = answer;
    button.addEventListener("click",()=>selectAnswer(index,button));
    answersElement.appendChild(button);
  });
}

function explodeSite(){
  const explosion = document.querySelector("#explosion");
  explosion.classList.add("ativa");
  document.body.style.overflow = "hidden";
  setTimeout(()=>{
    window.close();
    // Alguns navegadores bloqueiam o fechamento de abas abertas pelo usuário.
    // Nesse caso, a página fica encerrada na própria tela.
    document.body.innerHTML = '<main style="min-height:100vh;background:#111;color:white;display:grid;place-content:center;text-align:center;font-family:Arial;padding:25px"><h1 style="color:#e21d2f;font-size:clamp(42px,9vw,90px)">SITE ENCERRADO 💥</h1><p>Você errou o quiz do Jhow Brondani.</p></main>';
  },1300);
}

function selectAnswer(index,selectedButton){
  if(answered) return;
  answered = true;
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answersElement.querySelectorAll("button");
  buttons.forEach(button=>button.disabled=true);
  if(index !== correctIndex){
    selectedButton.classList.add("errada");
    explodeSite();
    return;
  }
  score++;
  selectedButton.classList.add("certa");
  feedbackElement.textContent = "Boa! Jhow Brondani segue no topo. 😎";
  scoreText.textContent = `Acertos: ${score}`;
  nextButton.disabled = false;
}

nextButton.addEventListener("click",()=>{
  if(!answered) return;
  if(currentQuestion < questions.length-1){
    currentQuestion++;
    showQuestion();
  }else{
    questionElement.textContent = `Gabaritou! ${score} de ${questions.length}.`;
    answersElement.innerHTML = "";
    feedbackElement.textContent = "Você conhece a maior lenda do Brasil. 🏆";
    progressText.textContent = "Quiz concluído";
    progressBar.style.width = "100%";
    nextButton.textContent = "Jogar novamente";
    nextButton.onclick = restartQuiz;
  }
});

function restartQuiz(){
  currentQuestion = 0;
  score = 0;
  scoreText.textContent = "Acertos: 0";
  nextButton.onclick = null;
  showQuestion();
}
showQuestion();
