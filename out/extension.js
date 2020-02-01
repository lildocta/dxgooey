"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const vscode_express_1 = require("vscode-express");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    //initialize VSCExpress for GUI
    const vscexpress = new vscode_express_1.VSCExpress(context, 'view');
    context.subscriptions.push(vscode.commands.registerCommand('extension.dxgOpen', () => {
        vscexpress.open('index.html', 'DX Gooey', vscode.ViewColumn.One);
    }));
    //create scratch org
    let createNewScratchOrg = vscode.commands.registerCommand('extension.createNewScratchOrg', () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        vscode.window.createTerminal('DX Gooey', 'Bash');
        (_a = vscode.window.activeTerminal) === null || _a === void 0 ? void 0 : _a.sendText('sfdx force:org:create -f project-scratch-def.json');
    }));
    context.subscriptions.push(createNewScratchOrg);
    //update scratch org
    let openScratchOrg = vscode.commands.registerCommand('extension.openScratchOrg', () => __awaiter(this, void 0, void 0, function* () {
        var _b;
        vscode.window.createTerminal('DX Gooey', 'Bash');
        (_b = vscode.window.activeTerminal) === null || _b === void 0 ? void 0 : _b.sendText('sfdx force:org:open');
    }));
    context.subscriptions.push(openScratchOrg);
    //update scratch org
    let updateScratchOrg = vscode.commands.registerCommand('extension.updateScratchOrg', () => __awaiter(this, void 0, void 0, function* () {
        var _c;
        vscode.window.createTerminal('DX Gooey', 'Bash');
        (_c = vscode.window.activeTerminal) === null || _c === void 0 ? void 0 : _c.sendText('sfdx force:source:push');
    }));
    context.subscriptions.push(updateScratchOrg);
    //get changes from scratch org
    let pullFromScratchOrg = vscode.commands.registerCommand('extension.pullFromScratchOrg', () => __awaiter(this, void 0, void 0, function* () {
        var _d, _e;
        vscode.window.createTerminal('DX Gooey', 'Bash');
        yield ((_d = vscode.window.activeTerminal) === null || _d === void 0 ? void 0 : _d.sendText('sfdx force:source:pull'));
        const answer = yield vscode.window.showInputBox({ prompt: 'What changes did you make in the Scratch Org' });
        (_e = vscode.window.activeTerminal) === null || _e === void 0 ? void 0 : _e.sendText('git add . && git commit -m \'' + answer + '\' && git push');
    }));
    context.subscriptions.push(pullFromScratchOrg);
    // const answer = await vscode.window.showInputBox();
    // vscode.window.showInformationMessage(answer);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map