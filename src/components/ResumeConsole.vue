<template>
    <main id="resume-console" class="wrapper">
        <section class="terminal-container">
            <div class="terminal-header">
                <div class="dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
                <div class="terminal-title">guest@strsx:~ (CTF Challenge)</div>
            </div>
            <div class="terminal-body" ref="terminalBody">
                <div class="terminal-output">
                    <div v-for="(line, index) in terminalLines" :key="index" :class="line.type">
                        <span v-if="line.type === 'input'" class="prompt">guest@strsx:~$ </span>
                        <span v-html="line.text"></span>
                    </div>
                </div>
                <div class="terminal-input-line">
                    <span class="prompt">guest@strsx:~$ </span>
                    <input 
                        type="text" 
                        v-model="currentInput" 
                        @keyup.enter="handleCommand" 
                        ref="commandInput"
                        autofocus
                        class="terminal-input"
                    >
                </div>

                <div class="quick-commands">
                    <button v-for="cmd in quickCmds" :key="cmd" @click="runQuickCommand(cmd)" class="cmd-btn">
                        {{ cmd }}
                    </button>
                </div>
            </div>
        </section>

        <div class="mail-wrapper">
            <a href="mailto:sebastian.ko.dv@gmail.com"><h4>sebastian.ko.dv@gmail.com</h4></a>
        </div>
        <Spine />
    </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import '@/styles/page-common.scss';
import Spine from '@/components/Spine.vue';

const router = useRouter();
const currentInput = ref('');
const currentStep = ref(0); // 0: start, 1: ls done, 2: cat hint done, 3: decoded done

const quickCmds = computed(() => {
    switch (currentStep.value) {
        case 0: return ['help', 'ls'];
        case 1: return ['cat hint.txt', 'clear'];
        case 2: return ['base64decode ZGlnaXRhbF9wcmVzZW5jZQ==', 'clear'];
        case 3: return ['unlock digital_presence', 'clear'];
        default: return ['help', 'ls', 'clear'];
    }
});

const terminalLines = ref([
    { text: 'Welcome to the strsx.com restricted console.', type: 'info' },
    { text: 'System security level: HIGH. Privacy protocols active.', type: 'info' },
    { text: 'Type "help" to see available commands.', type: 'info' },
    { text: 'Challenge: Find the hidden entry point to the resume.', type: 'challenge' },
]);
const terminalBody = ref(null);
const commandInput = ref(null);

const runQuickCommand = (cmd) => {
    currentInput.value = cmd;
    handleCommand();
};

const handleCommand = () => {
    const rawInput = currentInput.value.trim();
    if (!rawInput) return;

    terminalLines.value.push({ text: rawInput, type: 'input' });
    currentInput.value = '';

    processCommand(rawInput);
    
    nextTick(() => {
        if (terminalBody.value) {
            terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
        }
    });
};

const processCommand = (rawCmd) => {
    const cmd = rawCmd.toLowerCase();

    if (cmd.startsWith('base64decode ')) {
        try {
            const encoded = rawCmd.substring(13).trim();
            const decoded = atob(encoded);
            terminalLines.value.push({ text: `Decoded: ${decoded}`, type: 'success' });
            if (decoded === 'digital_presence') currentStep.value = 3;
        } catch (e) {
            terminalLines.value.push({ text: 'Error: Invalid Base64 string.', type: 'error' });
        }
        return;
    }

    switch (cmd) {
        case 'help':
            terminalLines.value.push({ text: 'Available commands: <br> - ls: List files <br> - cat [file]: Read file content <br> - base64decode [string]: Decode Base64 <br> - hint: Get a clue <br> - unlock [key]: Unlock the resume <br> - clear: Clear console', type: 'system' });
            break;
        case 'ls':
            terminalLines.value.push({ text: 'total 2 <br> -r--r--r-- 1 root root  42 Jan 30 13:37 hint.txt <br> -r--r----- 1 root root 1024 Jan 30 13:37 secret_binary', type: 'system' });
            currentStep.value = 1;
            break;
        case 'cat hint.txt':
            terminalLines.value.push({ text: 'Clue: "The truth is encoded in the matrix. Look closely at the base." <br> [!] Base64 String: ZGlnaXRhbF9wcmVzZW5jZQ==', type: 'system' });
            currentStep.value = 2;
            break;
        case 'cat secret_binary':
            terminalLines.value.push({ text: 'Error: Cannot read binary file. Permission denied.', type: 'error' });
            break;
        case 'hint':
            terminalLines.value.push({ text: 'Hint: Decode the Base64 found in hint.txt to find the unlock key. Use "base64decode [string]" to decode.', type: 'info' });
            break;
        case 'clear':
            terminalLines.value.push({ text: 'Welcome to the strsx.com restricted console.', type: 'info' });
            terminalLines.value.push({ text: 'Challenge: Find the hidden entry point to the resume.', type: 'challenge' });
            currentStep.value = 0;
            break;
        case 'unlock digital_presence':
            terminalLines.value.push({ text: '[SUCCESS] Access Granted. Decrypting path...', type: 'success' });
            terminalLines.value.push({ text: 'The secret path is: <strong>/real-resume</strong>', type: 'success' });
            terminalLines.value.push({ text: 'Redirecting in 3 seconds...', type: 'info' });
            setTimeout(() => {
                router.push('/real-resume');
            }, 3000);
            break;
        case cmd.startsWith('unlock ') ? cmd : '':
            terminalLines.value.push({ text: '[FAILED] Incorrect key. Intrusion attempt logged.', type: 'error' });
            break;
        case 'whoami':
            terminalLines.value.push({ text: 'guest_user_#412', type: 'system' });
            break;
        default:
            terminalLines.value.push({ text: `Command not found: ${cmd}`, type: 'error' });
    }
};

onMounted(() => {
    window.addEventListener("beforeunload", () => window.scroll(0, 0));
    if (commandInput.value) {
        commandInput.value.focus();
    }
    // Auto-focus terminal on click, but only if not selecting text
    document.addEventListener('mouseup', () => {
        const selection = window.getSelection().toString();
        if (!selection && commandInput.value) {
            commandInput.value.focus();
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", () => window.scroll(0, 0));
});
</script>

<style lang="scss" scoped>
.terminal-container {
    width: 90%;
    max-width: 800px;
    height: 500px;
    background: #0c0c0c;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(60, 184, 120, 0.2);
    display: flex;
    flex-direction: column;
    margin: 5vh auto;
    border: 1px solid #1a1a1a;
    overflow: hidden;
    position: relative;
    z-index: 100; /* Ensure it's above the wrapper spine/line */
    user-select: text !important;
}

.terminal-header {
    background: #1e1e1e;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #333;
}

.dots {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.terminal-title {
    color: #969696;
    font-size: 0.8rem;
    margin-left: 20px;
    font-family: 'Consolas', monospace;
}

.terminal-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    color: #d0d0d0;
    line-height: 1.6;
    user-select: text; /* Allow copying strings */

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 4px;
    }
}

.terminal-output {
    user-select: text;
}

.prompt {
    color: #3cb878;
    font-weight: bold;
}

.info { color: #888; }
.challenge { color: #ffbd2e; font-weight: bold; }
.system { color: #3498db; }
.error { color: #ff5f56; }
.success { color: #27c93f; font-weight: bold; }
.input { color: #fff; }

.terminal-input-line {
    display: flex;
    align-items: center;
}

.terminal-input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-family: inherit;
    font-size: inherit;
    flex: 1;
    margin-left: 8px;
}

@media screen and (max-width: 568px) {
    .terminal-container {
        height: 80vh;
        width: 95%;
        font-size: 0.8rem;
    }
}
.quick-commands {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #333;
    padding-top: 20px;
}

.cmd-btn {
    background: rgba(60, 184, 120, 0.1);
    border: 1px solid rgba(60, 184, 120, 0.3);
    color: #3cb878;
    padding: 6px 12px;
    border-radius: 4px;
    font-family: 'Consolas', monospace;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(60, 184, 120, 0.3);
        border-color: #3cb878;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
}
</style>