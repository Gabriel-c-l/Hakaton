
    // Obtenha o modal
    var modal = document.getElementById("configModal");
    // Obtenha o botão que abre o modal
    var btn = document.querySelector(".botaoConfig");
    // Obtenha o elemento <span> que fecha o modal
    var span = document.getElementsByClassName("close")[0];
    // Obtenha o botão de mudar para o tema escuro
    var darkModeToggle = document.getElementById("darkModeToggle");
    // Obtenha o botão não funcional
    var nonFunctionalButton = document.getElementById("nonFunctionalButton");

    // Quando o usuário clica no botão, abre o modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Quando o usuário clica no <span> (x), fecha o modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Quando o usuário clica fora do modal, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Função para alternar o tema
    darkModeToggle.onclick = function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "Mudar para Tema Claro";
        } else {
            darkModeToggle.textContent = "Mudar para Tema Escuro";
        }
    }
