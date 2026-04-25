<template>
    <div class="chatbot-wrapper">
        <!-- Toggle Button -->
        <button
            id="chatbot-toggle"
            class="chatbot-toggle"
            :class="{ 'is-open': isOpen }"
            @click="toggleChat"
            aria-label="Toggle chatbot"
        >
            <svg v-if="!isOpen" class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <svg v-else class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>

        <!-- Chat Window -->
        <Transition name="chatbox">
            <div v-if="isOpen" id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="3" y="4" width="18" height="12" rx="2"/>
                                <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                                <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                                <path d="M4 16v2a2 2 0 0 0 2 2h3l3 2 3-2h3a2 2 0 0 0 2-2v-2"/>
                            </svg>
                        </div>
                        <div>
                            <h4>strsx bot</h4>
                            <span class="chatbot-status">
                                <span class="status-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button class="chatbot-close" @click="toggleChat" aria-label="Close chatbot">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div ref="messagesContainer" class="chatbot-messages">
                    <div
                        v-for="(msg, index) in messages"
                        :key="index"
                        class="chatbot-message"
                        :class="msg.role === 'user' ? 'is-user' : 'is-bot'"
                    >
                        <div class="message-bubble">
                            <span v-html="formatMessage(msg.content)"></span>
                        </div>
                    </div>
                    <div v-if="isLoading" class="chatbot-message is-bot">
                        <div class="message-bubble typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <form class="chatbot-input" @submit.prevent="sendMessage">
                    <input
                        id="chatbot-input-field"
                        v-model="userInput"
                        type="text"
                        placeholder="Type a message..."
                        :disabled="isLoading"
                        autocomplete="off"
                    />
                    <button
                        id="chatbot-send-btn"
                        type="submit"
                        :disabled="!userInput.trim() || isLoading"
                        aria-label="Send message"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </form>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

defineOptions({
    name: 'ChatbotWidget'
});

const API_URL = 'https://chatbot.sebastian93921.workers.dev/';

const isOpen = ref(false);
const isLoading = ref(false);
const userInput = ref('');
const messagesContainer = ref(null);
const messages = ref([
    {
        role: 'bot',
        content: 'Hey there! 👋 I\'m strsx bot. Ask me anything about Sebastian — skills, experience, or projects!'
    }
]);

const toggleChat = () => {
    isOpen.value = !isOpen.value;
};

const scrollToBottom = async () => {
    await nextTick();
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};

const formatMessage = (text) => {
    let html = text
        // Escape HTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Bold: **text**
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic: *text*
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code: `code`
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // URLs
        .replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // Line breaks
        .replace(/\n/g, '<br>');

    // Bullet points: lines starting with "- " or "* "
    html = html.replace(/((?:^|<br>)\s*[-*]\s.+(?:<br>\s*[-*]\s.+)*)/g, (match) => {
        const items = match
            .split('<br>')
            .filter(line => line.trim())
            .map(line => '<li>' + line.replace(/^\s*[-*]\s/, '') + '</li>')
            .join('');
        return '<ul>' + items + '</ul>';
    });

    return html;
};

const getRecentContext = () => {
    // Get last 5 messages (excluding the initial greeting)
    const recentMessages = messages.value
        .filter(m => m !== messages.value[0]) // skip initial bot greeting
        .slice(-5);
    return recentMessages.map(m => `${m.role === 'user' ? 'User' : 'Bot'}: ${m.content}`).join('\n');
};

const sendMessage = async () => {
    const text = userInput.value.trim();
    if (!text || isLoading.value) return;

    // Add user message
    messages.value.push({ role: 'user', content: text });
    userInput.value = '';
    isLoading.value = true;
    scrollToBottom();

    try {
        // Build message with last 5 messages as context
        const context = getRecentContext();
        const fullMessage = context
            ? `[Conversation History]\n${context}\n\n[Current Message]\n${text}`
            : text;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: fullMessage })
        });

        const rawText = await response.text();
        console.log('Chatbot API response:', response.status, rawText);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${rawText}`);
        }

        let botReply;
        try {
            const data = JSON.parse(rawText);

            // Gemini-style response: extract text from candidates[0].content.parts
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const parts = data.candidates[0].content.parts || [];
                // Filter out thought parts, only keep actual response text
                const textParts = parts
                    .filter(p => !p.thought)
                    .map(p => p.text)
                    .filter(Boolean);
                botReply = textParts.join('\n') || 'Sorry, I didn\'t get a response.';
            } else {
                // Fallback for other response formats
                botReply = data.response || data.message || data.reply || data.text || data.answer || data.content || rawText;
            }
        } catch (e) {
            // If response is not JSON, use raw text
            botReply = rawText;
        }

        messages.value.push({ role: 'bot', content: String(botReply) });
    } catch (err) {
        console.error('Chatbot error:', err);
        messages.value.push({
            role: 'bot',
            content: 'Oops, something went wrong. Please try again later.'
        });
    } finally {
        isLoading.value = false;
        scrollToBottom();
    }
};
</script>

<style lang="scss" scoped>
.chatbot-wrapper {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    font-family: 'Maven Pro', sans-serif;
}

/* Toggle Button */
.chatbot-toggle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #682AE9 0%, #9b59b6 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
        0 4px 20px rgba(104, 42, 233, 0.4),
        0 0 40px rgba(104, 42, 233, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
        transform: scale(1.08);
        box-shadow:
            0 6px 28px rgba(104, 42, 233, 0.55),
            0 0 60px rgba(104, 42, 233, 0.25);
    }

    &:active {
        transform: scale(0.95);
    }

    &.is-open {
        background: linear-gradient(135deg, #3d1a8a 0%, #682AE9 100%);
    }

    .chatbot-icon {
        width: 24px;
        height: 24px;
        color: #fff;
        transition: transform 0.3s ease;
    }

    /* Pulse ring animation */
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid rgba(104, 42, 233, 0.5);
        animation: pulseRing 2.5s ease-out infinite;
    }

    &.is-open::before {
        animation: none;
        opacity: 0;
    }
}

@keyframes pulseRing {
    0% {
        transform: scale(1);
        opacity: 0.6;
    }
    100% {
        transform: scale(1.6);
        opacity: 0;
    }
}

/* Chat Window */
.chatbot-window {
    position: absolute;
    bottom: 72px;
    right: 0;
    width: 380px;
    max-height: 520px;
    background: rgba(19, 18, 29, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(104, 42, 233, 0.25);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(104, 42, 233, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Header */
.chatbot-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(104, 42, 233, 0.15) 0%, rgba(155, 89, 182, 0.08) 100%);
    border-bottom: 1px solid rgba(104, 42, 233, 0.15);
}

.chatbot-header-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.chatbot-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #682AE9, #9b59b6);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
        width: 20px;
        height: 20px;
        color: #fff;
    }
}

.chatbot-header h4 {
    color: #dbdbdb;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
}

.chatbot-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    color: #808080;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3cb878;
    display: inline-block;
    animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.chatbot-close {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    svg {
        width: 16px;
        height: 16px;
        color: #808080;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        svg { color: #dbdbdb; }
    }
}

/* Messages */
.chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 280px;
    max-height: 360px;

    /* Scrollbar */
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(104, 42, 233, 0.3);
        border-radius: 4px;
    }
}

.chatbot-message {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    animation: messageSlideIn 0.3s ease-out;

    &.is-user {
        justify-content: flex-end;
    }
    &.is-bot {
        justify-content: flex-start;
    }
}

@keyframes messageSlideIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message-bubble {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 0.85rem;
    line-height: 1.5;
    word-break: break-word;

    .is-user & {
        background: linear-gradient(135deg, #682AE9, #7c3aed);
        color: #fff;
        border-bottom-right-radius: 4px;
    }

    .is-bot & {
        background: rgba(255, 255, 255, 0.07);
        color: #dbdbdb;
        border-bottom-left-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    a {
        color: #a78bfa;
        text-decoration: underline;
        transition: color 0.2s ease;

        &:hover {
            color: #c4b5fd;
        }
    }

    strong {
        font-weight: 700;
        color: #fff;
    }

    em {
        font-style: italic;
    }

    code {
        background: rgba(255, 255, 255, 0.1);
        padding: 1px 5px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.8rem;
    }

    ul {
        margin: 6px 0;
        padding-left: 1.2em;
    }

    li {
        margin-bottom: 2px;
        list-style: disc;
    }
}

/* Typing indicator */
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 18px;

    span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #808080;
        animation: typingBounce 1.4s ease-in-out infinite;

        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
    }
}

@keyframes typingBounce {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-6px);
        opacity: 1;
    }
}

/* Input */
.chatbot-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-top: 1px solid rgba(104, 42, 233, 0.12);
    background: rgba(0, 0, 0, 0.2);

    input {
        flex: 1;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 10px 14px;
        color: #dbdbdb;
        font-size: 0.85rem;
        font-family: 'Maven Pro', sans-serif;
        outline: none;
        transition: all 0.2s ease;

        &::placeholder {
            color: #555;
        }

        &:focus {
            border-color: rgba(104, 42, 233, 0.4);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 2px rgba(104, 42, 233, 0.1);
        }

        &:disabled {
            opacity: 0.5;
        }
    }

    button[type="submit"] {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, #682AE9, #7c3aed);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;

        svg {
            width: 18px;
            height: 18px;
            color: #fff;
        }

        &:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 2px 12px rgba(104, 42, 233, 0.4);
        }

        &:active:not(:disabled) {
            transform: scale(0.95);
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    }
}

/* Transition */
.chatbox-enter-active {
    animation: chatboxIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chatbox-leave-active {
    animation: chatboxOut 0.2s ease-in;
}

@keyframes chatboxIn {
    from {
        opacity: 0;
        transform: scale(0.85) translateY(16px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes chatboxOut {
    from {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    to {
        opacity: 0;
        transform: scale(0.85) translateY(16px);
    }
}

/* Responsive */
@media screen and (max-width: 480px) {
    .chatbot-wrapper {
        bottom: 1rem;
        right: 1rem;
    }

    .chatbot-window {
        width: calc(100vw - 2rem);
        max-height: 70vh;
        right: 0;
        bottom: 64px;
    }

    .chatbot-toggle {
        width: 48px;
        height: 48px;

        .chatbot-icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
