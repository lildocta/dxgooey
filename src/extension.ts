// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {VSCExpress} from 'vscode-express';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	//initialize VSCExpress for GUI
	const vscexpress = new VSCExpress(context, 'view');
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.dxgOpen',
		() => {
			vscexpress.open('index.html', 'DX Gooey',
			vscode.ViewColumn.One);
	})); 
	
	//create scratch org
	let createNewScratchOrg = vscode.commands.registerCommand('extension.createNewScratchOrg', async() =>{
		vscode.window.createTerminal('DX Gooey', 'Bash');
		const answer = await vscode.window.showInputBox({prompt:'Provide a short description (10-20 letters) about what functionality you are going to be working on in Salesforce'});
		vscode.window.activeTerminal?.sendText('git checkout -b ' + answer);
		vscode.window.activeTerminal?.sendText('sfdx force:org:create -f project-scratch-def.json');
	});
	context.subscriptions.push(createNewScratchOrg);

	//update scratch org
	let openScratchOrg = vscode.commands.registerCommand('extension.openScratchOrg', async() =>{
		vscode.window.createTerminal('DX Gooey', 'Bash');
		vscode.window.activeTerminal?.sendText('sfdx force:org:open');
	});
	context.subscriptions.push(openScratchOrg);

	//update scratch org
	let updateScratchOrg = vscode.commands.registerCommand('extension.updateScratchOrg', async() =>{
		vscode.window.createTerminal('DX Gooey', 'Bash');
		vscode.window.activeTerminal?.sendText('sfdx force:source:push');
	});
	context.subscriptions.push(updateScratchOrg);

	//get changes from scratch org
	let pullFromScratchOrg = vscode.commands.registerCommand('extension.pullFromScratchOrg', async() =>{
		vscode.window.createTerminal('DX Gooey', 'Bash');
		await vscode.window.activeTerminal?.sendText('sfdx force:source:pull');
		const answer = await vscode.window.showInputBox({prompt:'What changes did you make in the Scratch Org'});
		vscode.window.activeTerminal?.sendText('git add . && git commit -m \'' + answer + '\' && git push');
	});
	context.subscriptions.push(pullFromScratchOrg);

	// const answer = await vscode.window.showInputBox();
	// vscode.window.showInformationMessage(answer);
}

// this method is called when your extension is deactivated
export function deactivate() {}
