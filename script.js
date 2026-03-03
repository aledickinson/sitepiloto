document.addEventListener("DOMContentLoaded", function () {
  const rodape = document.getElementById("rodape-texto");

  if (rodape) {
    const anoAtual = new Date().getFullYear();
    rodape.textContent = `Rodapé padrão • ${anoAtual}`;
  }
});
