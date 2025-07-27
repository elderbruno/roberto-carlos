
const perguntas = [
  { audio: "audios/musica1.mp3", opcoes: ["Emoções", "Detalhes", "Outra Vez", "Lady Laura"], resposta: "Emoções" },
  { audio: "audios/musica2.mp3", opcoes: ["Cama e Mesa", "Detalhes", "Amigo", "Falando Sério"], resposta: "Detalhes" },
  { audio: "audios/musica3.mp3", opcoes: ["Além do Horizonte", "Outra Vez", "Amigo", "Esse Cara Sou Eu"], resposta: "Outra Vez" },
  { audio: "audios/musica4.mp3", opcoes: ["O Calhambeque", "Mulher Pequena", "Falando Sério", "Emoções"], resposta: "O Calhambeque" },
  { audio: "audios/musica5.mp3", opcoes: ["Mulher Pequena", "Proposta", "Amigo", "Café da Manhã"], resposta: "Amigo" },
  { audio: "audios/musica6.mp3", opcoes: ["Detalhes", "Cama e Mesa", "Como É Grande o Meu Amor Por Você", "Se Você Pensa"], resposta: "Cama e Mesa" },
  { audio: "audios/musica7.mp3", opcoes: ["Emoções", "Como Vai Você", "Falando Sério", "Outra Vez"], resposta: "Falando Sério" },
  { audio: "audios/musica8.mp3", opcoes: ["O Portão", "O Calhambeque", "Proposta", "Amigo"], resposta: "Proposta" },
  { audio: "audios/musica9.mp3", opcoes: ["Esse Cara Sou Eu", "Como Vai Você", "Se Você Pensa", "Detalhes"], resposta: "Esse Cara Sou Eu" },
  { audio: "audios/musica10.mp3", opcoes: ["O Portão", "Lady Laura", "Outra Vez", "Detalhes"], resposta: "Lady Laura" }
];

let indiceAtual = 0;

const audio = document.getElementById("audio");
const replayBtn = document.getElementById("replay");
const opcoesDiv = document.getElementById("opcoes");
const feedbackDiv = document.getElementById("feedback");
const proximaBtn = document.getElementById("proxima");

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];
  audio.src = pergunta.audio;
  feedbackDiv.textContent = "";
  opcoesDiv.innerHTML = "";
  pergunta.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => verificarResposta(opcao);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(opcaoEscolhida) {
  const correta = perguntas[indiceAtual].resposta;
  if (opcaoEscolhida === correta) {
    feedbackDiv.textContent = "✅ Você acertou!";
    feedbackDiv.style.color = "green";
  } else {
    feedbackDiv.textContent = `❌ Errou! Era "${correta}"`;
    feedbackDiv.style.color = "red";
  }
  proximaBtn.style.display = "inline-block";
}

proximaBtn.onclick = () => {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
    proximaBtn.style.display = "none";
  } else {
    document.getElementById("quiz").innerHTML = "<h2>Fim do jogo! Parabéns 🎉</h2>";
    proximaBtn.style.display = "none";
  }
};

replayBtn.onclick = () => {
  audio.play();
};

window.onload = () => {
  perguntas.sort(() => Math.random() - 0.5); // embaralhar
  carregarPergunta();
};


function iniciarJogo() {
  document.getElementById("tela-abertura").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("tela-abertura").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("musicaAbertura").pause();
  }, 1000);
}
