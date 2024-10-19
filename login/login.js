document.addEventListener('DOMContentLoaded', () => {
    const dados = localStorage.getItem('formLogin');

    if (dados) {
        const dadosJson = JSON.parse(dados);
        console.log(dadosJson);
        document.getElementById('dados').innerHTML = JSON.stringify(dadosJson);
    }
})