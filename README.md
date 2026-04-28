#  NuitBlanche (пустой)

> "Um lugar para falar com ninguém, ou com quem quer que também esteja perdido na madrugada."

**NuitBlanche** é um experimento de comunicação em tempo real focado em atmosfera e feedback tátil/auditivo. No centro da aplicação está o **Pustoy** (Vazio), um chat onde a presença é fugaz e as mensagens são mediadas por uma interface que evoca melancolia e tecnologia analógica.

## 🪽 A Estética
O projeto não é apenas um chat; é uma experiência sensorial:
- **Visual:** Filtros de distorção VHS e scanlines que dão a sensação de uma tela de tubo antiga.
- **Auditivo:** Implementação de sons de teclados mecânicos para cada caractere digitado, devolvendo o peso tátil à escrita digital.
- **Filosófica:** O nome "Pustoy" reflete a ausência de histórico persistente para o usuário comum — você entra, digita, e existe apenas enquanto a conexão durar.

## Especificações Técnicas
- **Engine de Realtime:** Utilização das *Broadcast Channels* do **Supabase** para garantir latência mínima na troca de mensagens.
- **Banco de Dados:** PostgreSQL (Supabase) para gerenciamento rápido de estados e nicknames.
- **Audio Design:** Manipulação do DOM para gatilhos de áudio sincronizados com eventos de digitação (`keydown`).
- **Frontend:** HTML5 e CSS3 puro, com foco em filtros de opacidade e animações de ruído (noise).

Como acessar
Basta escolher um nickname. Sem senhas, sem e-mails, sem rastreamento. Apenas o código e o eco das suas teclas.


Desenvolvido por **Gravestone Henry**.
*"No vazio, o barulho de uma tecla é um evento."*
