const teams = {
    "Admnistração": ["Jhully", "Fernanda", "Jaquelaira", "Gislaine", "Ana Beatriz", "Taynara"],
    "Designers & Editores": ["Artur", "Procópio", "Pamela", "Lucas"],
    "Social medias": ["Tainara", "Evelin", "Ranielle","Mariana", "Igor"],
    "SEO": ["Guilherme", "Micael"],
    "Tráfego Pago": ["Samuel", "Leandro", "Agatha", "Lucas", "André", "Marcos"],
    "W3V": ["Fred", "Larissa", "Letícia", "Alice"],
    "Allp Fit": ["Rayane", "Júlia", "Juan", "Wellen", "Rafaela", "Geovana", "Pedro", "Ed", "Sabrina", "Duda", "Ana Clara" ],
    "PodCast": ["Eli", "Victor", "Vinicius"],
};

const teamContainer = document.getElementById('teams');
const selectedMembers = [];
const selectedW3VMembers = [];

const handleTeamClick = (team) => {
    const membersList = document.getElementById(`members-${team}`);
    membersList.style.display = membersList.style.display === 'none' ? 'block' : 'none';
};

const handleMemberSelect = (member, checkbox, team) => {
    if (checkbox.checked) {
        if (team === "W3V") {
            selectedW3VMembers.push(member);
        } else {
            selectedMembers.push(member);
        }
    } else {
        if (team === "W3V") {
            const index = selectedW3VMembers.indexOf(member);
            if (index > -1) selectedW3VMembers.splice(index, 1);
        } else {
            const index = selectedMembers.indexOf(member);
            if (index > -1) selectedMembers.splice(index, 1);
        }
    }
};

const printSelectedMembers = () => {
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Quem vai querer pão</title>');
    printWindow.document.write('<style>ul { font-size: 30px; list-style-position: inside; list-style-type: decimal; } .lists-container { display: flex; justify-content: space-between; } .list { margin: 0 20px; } h2 { font-size: 35px; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Quem vai querer pão</h1>');

    // Cria os contêineres das listas lado a lado
    printWindow.document.write('<style>ul { font-size: 30px; list-style-position: inside; list-style-type: decimal; } .lists-container { display: flex; justify-content: center; gap: 20px; } .list { margin: 0; } h2 { font-size: 35px; }</style>');


    // Lista da equipe Goon
    printWindow.document.write('<div class="list"><h2>Goon</h2><ul>');
    selectedMembers.forEach(member => {
        printWindow.document.write(`<li>${member}</li>`);
    });
    printWindow.document.write('</ul></div>');

    // Lista da equipe W3V
    printWindow.document.write('<div class="list"><h2>W3V</h2><ul>');
    selectedW3VMembers.forEach(member => {
        printWindow.document.write(`<li>${member}</li>`);
    });
    printWindow.document.write('</ul></div>');

    printWindow.document.write('</div>'); // Fecha o contêiner das listas

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
};

Object.keys(teams).forEach(team => {
    const teamElement = document.createElement('div');
    const teamHeader = document.createElement('h2');
    teamHeader.innerText = team;
    teamHeader.onclick = () => handleTeamClick(team);
    teamElement.appendChild(teamHeader);

    const membersList = document.createElement('ul');
    membersList.id = `members-${team}`;
    membersList.style.display = 'none';
    teams[team].forEach(member => {
        const memberItem = document.createElement('li');
        const memberLabel = document.createElement('label');
        const memberCheckbox = document.createElement('input');
        memberCheckbox.type = 'checkbox';
        memberCheckbox.onchange = (event) => handleMemberSelect(member, event.target, team);
        memberLabel.appendChild(memberCheckbox);
        memberLabel.appendChild(document.createTextNode(member));
        memberItem.appendChild(memberLabel);
        membersList.appendChild(memberItem);
    });
    teamElement.appendChild(membersList);

    teamContainer.appendChild(teamElement);
});

document.getElementById('printButton').onclick = printSelectedMembers;


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(registration => {
      console.log("Service Worker registrado com sucesso:", registration);
    }).catch(error => {
      console.error("Falha ao registrar o Service Worker:", error);
    });
  }