
const perguntas = [
  {
    audio: "audios/recortes/por_amor.mp3",
    opcoes: ["Por Amor", "Com Você", "Outra Vez", "Você"],
    resposta: "Por Amor"
  },
  {
    audio: "audios/recortes/com_voce.mp3",
    opcoes: ["Você", "Com Você", "Assunto Predileto", "Rotina"],
    resposta: "Com Você"
  },
  {
    audio: "audios/recortes/rotina.mp3",
    opcoes: ["Rotina", "Fera Ferida", "Por Amor", "Se Eu Partir"],
    resposta: "Rotina"
  },
  {
    audio: "audios/recortes/se_eu_partir.mp3",
    opcoes: ["Se Eu Partir", "Quero Lhe Falar do Meu Amor", "Alô", "Outra Vez"],
    resposta: "Se Eu Partir"
  },
  {
    audio: "audios/recortes/voce.mp3",
    opcoes: ["Você", "Assunto Predileto", "Por Amor", "Rotina"],
    resposta: "Você"
  },
  {
    audio: "audios/recortes/outra_vez.mp3",
    opcoes: ["Outra Vez", "Você", "Fera Ferida", "Alô"],
    resposta: "Outra Vez"
  },
  {
    audio: "audios/recortes/alo.mp3",
    opcoes: ["Alô", "Com Você", "Rotina", "Por Amor"],
    resposta: "Alô"
  },
  {
    audio: "audios/recortes/assunto_predileto.mp3",
    opcoes: ["Assunto Predileto", "Quero Lhe Falar do Meu Amor", "Você", "Outra Vez"],
    resposta: "Assunto Predileto"
  },
  {
    audio: "audios/recortes/quero_lhe_falar.mp3",
    opcoes: ["Quero Lhe Falar do Meu Amor", "Você", "Fera Ferida", "Com Você"],
    resposta: "Quero Lhe Falar do Meu Amor"
  },
  {
    audio: "audios/recortes/fera_ferida.mp3",
    opcoes: ["Fera Ferida", "Alô", "Rotina", "Assunto Predileto"],
    resposta: "Fera Ferida"
  }
];

let musicasSelecionadas = [];
let indiceAtual = 0;
let acertos = 0;

const audio = document.getElementById("audio");
const replayBtn = document.getElementById("replay");
const opcoesDiv = document.getElementById("opcoes");
const feedbackDiv = document.getElementById("feedback");
const proximaBtn = document.getElementById("proxima");

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function carregarPergunta() {
  const pergunta = musicasSelecionadas[indiceAtual];
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
  const correta = musicasSelecionadas[indiceAtual].resposta;
  if (opcaoEscolhida === correta) {
    document.getElementById("somAcerto").play();
    feedbackDiv.textContent = "✅ Você acertou!";
    feedbackDiv.style.color = "green";
    acertos++;
  } else {
    feedbackDiv.textContent = `❌ Errou! Era "${correta}"`;
    document.getElementById("somErro").play();
    feedbackDiv.style.color = "red";
  }
  proximaBtn.style.display = "inline-block";
}

proximaBtn.onclick = () => {
  indiceAtual++;
  if (indiceAtual < musicasSelecionadas.length) {
    carregarPergunta();
    proximaBtn.style.display = "none";
  } else {
    mostrarPontuacaoFinal();
  }
};

function mostrarPontuacaoFinal() {
  const estrelas = "⭐".repeat(acertos) + "☆".repeat(musicasSelecionadas.length - acertos);
  document.getElementById("quiz").innerHTML = `
    <h2>Parabéns! Você acertou ${acertos} de ${musicasSelecionadas.length} 🎉</h2>
    <div style="font-size: 36px; margin: 15px;">${estrelas}</div>
    <button onclick="reiniciarJogo()">Jogar novamente</button>
  `;
}

replayBtn.onclick = () => {
  audio.play();
};

function iniciarJogo() {
  document.getElementById("tela-abertura").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("tela-abertura").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    
    const musica = document.getElementById("musicaAbertura");
    musica.volume = 0.7;
    musica.play().catch(() => {});
    setTimeout(() => musica.pause(), 14000);
    
    trocarFotoRoberto();
    iniciarRodada();
  }, 1000);
}

function iniciarRodada() {
  musicasSelecionadas = embaralhar(perguntas).slice(0, 7);
  indiceAtual = 0;
  acertos = 0;
  carregarPergunta();
}

function trocarFotoRoberto() {
  const fotos = ['rc1.jpg', 'rc2.jpg', 'rc3.jpg'];
  const escolhida = fotos[Math.floor(Math.random() * fotos.length)];
  document.getElementById("fotoRoberto").src = "imagens/" + escolhida;
}


function reiniciarJogo() {
  document.location.reload();
}
