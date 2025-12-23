import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function init() {
    console.log('\n--- ☕ Café Template Initializer ---\n');

    const name = await question('Enter Café Name (e.g., Gold Coffee): ');
    const slogan = await question('Enter Slogan (e.g., Best in Town): ');
    const whatsapp = await question('Enter WhatsApp Number (e.g., 251911223344): ');
    const primaryColor = await question('Enter Primary Color (Hex, e.g., #FF5733): ');
    const accentColor = await question('Enter Accent Color (Hex, e.g., #C70039): ');

    console.log('\nUpdating configuration files...\n');

    // 1. Update config.js
    const configPath = path.join(process.cwd(), 'src', 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');

    configContent = configContent.replace(/name: '.*'/, `name: '${name}'`);
    configContent = configContent.replace(/slogan: '.*'/, `slogan: '${slogan}'`);
    configContent = configContent.replace(/whatsappNumber: '.*'/, `whatsappNumber: '${whatsapp}'`);
    configContent = configContent.replace(/primaryColor: '.*'/, `primaryColor: '${primaryColor}'`);
    configContent = configContent.replace(/accentColor: '.*'/, `accentColor: '${accentColor}'`);

    fs.writeFileSync(configPath, configContent);
    console.log('✅ Updated src/config.js');

    // 2. Update index.css variables
    const cssPath = path.join(process.cwd(), 'src', 'index.css');
    let cssContent = fs.readFileSync(cssPath, 'utf8');

    cssContent = cssContent.replace(/--primary: #.*;/, `--primary: ${primaryColor};`);
    cssContent = cssContent.replace(/--accent: #.*;/, `--accent: ${accentColor};`);

    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ Updated src/index.css');

    console.log('\n--- 🎉 Setup Complete! ---\n');
    console.log('Next steps:');
    console.log('1. Replace public/logo.png with your new logo.');
    console.log('2. Update .env with new Supabase credentials.');
    console.log('3. Run `npm run dev` to see the changes.\n');

    rl.close();
}

init().catch(err => {
    console.error('Error during setup:', err);
    rl.close();
});
