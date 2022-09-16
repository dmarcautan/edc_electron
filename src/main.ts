import { app, BrowserWindow, Tray, Menu } from "electron";
import * as path from "path";
import * as Positioner from "electron-positioner";

if (require('electron-squirrel-startup')) {
	// eslint-disable-line global-require
	app.quit();
  }

let tray: Tray;
function setupTray() {
	tray = new Tray(path.join(__dirname, "../assets/Elements-tray-1024.png"));
	const contextMenu = Menu.buildFromTemplate([
		{ label: "About", click: openAboutWindow },
		{ label: "Close", click: () => app.quit() },
	]);
	tray.setToolTip("Elements Desktop Client");
	tray.setContextMenu(contextMenu);
}

function openAboutWindow() {
	// Create the browser window.
	const aboutWindow = new BrowserWindow({
		height: 200,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		width: 300,
		show: false,
		movable: false,
		autoHideMenuBar: true,
		resizable: false,
		frame: false,
		alwaysOnTop: true,
	});

	// and load the index.html of the app.
	aboutWindow.loadFile(path.join(__dirname, "../index.html"));
	aboutWindow.once("ready-to-show", () => {
		aboutWindow.show();
		new Positioner(aboutWindow).move("trayBottomLeft", tray.getBounds());
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	setupTray();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		// if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
