#!/usr/bin/env node
'use strict';

var prompts = require('@inquirer/prompts');
var Commander = require('commander');
var fs = require('fs');
var path = require('path');
var picocolors = require('picocolors');
var validateNpmName = require('validate-npm-package-name');
var download = require('download-git-repo');
var spawn = require('cross-spawn');
var fsExtra = require('fs-extra');
var handlebars = require('handlebars');
var ora = require('ora');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var prompts__default = /*#__PURE__*/_interopDefaultLegacy(prompts);
var Commander__default = /*#__PURE__*/_interopDefaultLegacy(Commander);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var validateNpmName__default = /*#__PURE__*/_interopDefaultLegacy(validateNpmName);
var download__default = /*#__PURE__*/_interopDefaultLegacy(download);
var spawn__default = /*#__PURE__*/_interopDefaultLegacy(spawn);
var handlebars__default = /*#__PURE__*/_interopDefaultLegacy(handlebars);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

const spinner = ora__default["default"]();
const startSpinner = (text) => {
    const msg = `${text}...\n`;
    spinner.start(msg);
};
const succeedSpiner = (text) => {
    spinner.stopAndPersist({
        symbol: '🎉',
        text: `${text}\n`,
    });
};
const failSpinner = (text) => {
    spinner.fail(picocolors.red(text));
};

const installTemplate = async ({ appName, root, packageManager }) => {
    /**
     * Create a package.json for the new project and write it to disk.
     */
    const packageJsonPath = `${root}/package.json`;
    const packageJsonContent = fs__default["default"].readFileSync(packageJsonPath, 'utf-8');
    const packageJsonResult = handlebars__default["default"].compile(packageJsonContent)({
        name: appName,
    });
    fs__default["default"].writeFileSync(packageJsonPath, packageJsonResult);
    /**
     * delete package-lock.json
     */
    fsExtra.removeSync(`${root}/package-lock.json`);
    /**
     * install dependencies
     */
    startSpinner(picocolors.cyan(`Installing dependencies with ${packageManager}...`));
    const child = spawn__default["default"](packageManager, ['install'], {
    // stdio: 'inherit',
    // env: {
    //   ...process.env,
    //   ADBLOCK: '1',
    //   NODE_ENV: 'development',
    //   DISABLE_OPENCOLLECTIVE: '1',
    // },
    });
    child.on('close', (code) => {
        if (code !== 0) {
            failSpinner('Failed to install dependencies.');
            return;
        }
        succeedSpiner('Install dependencies successfully.');
    });
};

/* eslint-disable no-console */
function isFolderEmpty(root, name) {
    const validFiles = [
        '.DS_Store',
        '.git',
        '.gitattributes',
        '.gitignore',
        '.gitlab-ci.yml',
        '.hg',
        '.hgcheck',
        '.hgignore',
        '.idea',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'Thumbs.db',
        'docs',
        'mkdocs.yml',
        'npm-debug.log',
        'yarn-debug.log',
        'yarn-error.log',
        'yarnrc.yml',
        '.yarn',
    ];
    const conflicts = fs__default["default"]
        .readdirSync(root)
        .filter((file) => !validFiles.includes(file))
        // Support IntelliJ IDEA-based editors
        .filter((file) => !/\.iml$/.test(file));
    if (conflicts.length > 0) {
        console.log(`The directory ${picocolors.green(name)} contains files that could conflict:`);
        console.log();
        for (const file of conflicts) {
            try {
                const stats = fs__default["default"].lstatSync(path__default["default"].join(root, file));
                if (stats.isDirectory()) {
                    console.log(`  ${picocolors.blue(file)}/`);
                }
                else {
                    console.log(`  ${file}`);
                }
            }
            catch {
                console.log(`  ${file}`);
            }
        }
        console.log();
        console.log('Either try using a new directory name, or remove the files listed above.');
        console.log();
        return false;
    }
    return true;
}

async function isWriteable(directory) {
    try {
        await fs__default["default"].promises.access(directory, (fs__default["default"].constants || fs__default["default"]).W_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}
function makeDir(root, options = { recursive: true }) {
    return fs__default["default"].promises.mkdir(root, options);
}

const getTemplateUrl = (template) => {
    return `https://github.com:rrr523/greenfield-${template}-template#master`;
};

const TEMPLATES_MAP = {
    nextjs: getTemplateUrl('nextjs'),
    cra: getTemplateUrl('cra'),
    vite: getTemplateUrl('vite'),
};

async function createApp({ appPath, packageManager, template, }) {
    const root = path__default["default"].resolve(appPath);
    if (!(await isWriteable(path__default["default"].dirname(root)))) {
        /* eslint-disable-next-line no-console */
        console.error(`The application path is not writable, please check folder permissions and try again.
      It is likely you do not have write permissions for this folder.
      `);
        process.exit(1);
    }
    const appName = path__default["default"].basename(root);
    await makeDir(root);
    if (!isFolderEmpty(root, appName)) {
        process.exit(1);
    }
    /* eslint-disable-next-line no-console */
    console.log(`Creating a new Greenfield app in ${picocolors.green(appName)}.`);
    process.chdir(root);
    startSpinner('downloading template...');
    download__default["default"](TEMPLATES_MAP[template], '.', { clone: false }, (err) => {
        if (err) {
            failSpinner(err.message);
            return;
        }
        succeedSpiner(`download template - ${template} success`);
        return installTemplate({
            appName,
            root,
            packageManager,
        });
    }).then(() => {
        // ...
    });
}

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
let projectPath = '';
const program = new Commander__default["default"].Command(packageJson.name);
program
    .version(packageJson.version)
    .argument('[project-directory]')
    .usage(`${picocolors.green('[project-directory]')} [options]`)
    .action((str) => {
    projectPath = str;
})
    .allowUnknownOption()
    .parse(process.argv);
async function runInitPrompts() {
    if (!projectPath) {
        projectPath = await prompts__default["default"].input({
            message: 'What is your project named?',
            validate: (val) => {
                const { validForNewPackages } = validateNpmName__default["default"](val);
                if (!validForNewPackages) {
                    return 'Invalid NPM name';
                }
                return true;
            },
        });
        projectPath = projectPath.trim();
    }
    if (!projectPath) {
        /* eslint-disable-next-line no-console */
        console.log('\nPlease specify the project directory:\n' +
            `  ${picocolors.cyan(program.name())} ${picocolors.green('<project-directory>')}\n` +
            'For example:\n' +
            `  ${picocolors.cyan(program.name())} ${picocolors.green('my-next-app')}\n\n` +
            `Run ${picocolors.cyan(`${program.name()} --help`)} to see all options.`);
        process.exit(1);
    }
    const template = await prompts__default["default"].select({
        message: 'select a template?',
        choices: [
            { name: 'nextjs', value: 'nextjs' },
            { name: 'create-react-app', value: 'cra' },
            { name: 'vite', value: 'vite' },
        ],
    });
    const packageManager = await prompts__default["default"].select({
        message: 'select a package manager?',
        choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' },
        ],
    });
    const resolvedProjectPath = path__default["default"].resolve(projectPath);
    const root = path__default["default"].resolve(resolvedProjectPath);
    const appName = path__default["default"].basename(root);
    const folderExists = fs__default["default"].existsSync(root);
    if (folderExists && !isFolderEmpty(root, appName)) {
        process.exit(1);
    }
    try {
        await createApp({
            appPath: resolvedProjectPath,
            packageManager,
            template,
        });
    }
    catch (reason) {
        // .
    }
}
runInitPrompts().catch(() => {
    // ignore error
});
