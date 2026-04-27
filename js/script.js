// 1. CONFIGURAÇÃO SUPABASE
const SUPABASE_URL = 'https://opknafktkwlwudriqosd.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_KHpwtpp1ZA5XDOuLSgS3rw_r2iiYQKL';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const feed = document.getElementById('feed');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');


function playKeySound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

// Aplicar som em todos os inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', () => {
        playKeySound();
    });
});

// 4. FUNÇÃO DE DATA/HORA
function getTimestamp() {
    const now = new Date();
    return now.toLocaleDateString('pt-BR') + " " + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// 5. FUNÇÃO PARA EXIBIR MENSAGEM NO FEED
function exibirMensagem(user, text, time) {
    const div = document.createElement('div');
    div.className = 'msg-block';
    div.innerHTML = `
        <span class="timestamp">[${time}]</span>
        <span class="user">${user}:</span>
        <span class="content">${text}</span>
    `;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
}

// 6. CARREGAR HISTÓRICO DO BANCO AO ABRIR O SITE
async function carregarHistorico() {
    const { data, error } = await _supabase
        .from('mensagens')
        .select('*')
        .order('id', { ascending: true });

    if (data) {
        data.forEach(msg => {
            exibirMensagem(msg.usuario, msg.texto, msg.horario);
        });
    }
}

// 7. ESCUTAR MENSAGENS NOVAS EM TEMPO REAL
_supabase
    .channel('public:mensagens')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensagens' }, payload => {
        const novaMsg = payload.new;
        exibirMensagem(novaMsg.usuario, novaMsg.texto, novaMsg.horario);
    })
    .subscribe();bscribe();

// 8. ENVIAR MENSAGEM PARA O SUPABASE
async function enviar() {
    const user = usernameInput.value.trim() || "ANÔNIMO";
    const text = messageInput.value.trim();
    const time = getTimestamp();

    if (text !== "") {
        console.log("Tentando enviar:", { user, text, time }); // Log para teste

        const { error } = await _supabase
            .from('mensagens')
            .insert([{ 
                usuario: user.toUpperCase(), 
                texto: text, 
                horario: time 
            }]);
        
        if (error) {
            console.error("ERRO DETALHADO DO SUPABASE:", error.message);
            alert("Erro ao enviar: " + error.message);
        } else {
            console.log("Mensagem enviada com sucesso!");
            messageInput.value = "";
        }
    }
}

// 9. EVENTO DE ENTER (MUDADO PARA KEYDOWN)
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Impede que o Enter crie uma nova linha ou recarregue
        enviar();
    }
});

// Inicialização
carregarHistorico();