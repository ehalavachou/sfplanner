function getCursorCoord(evt) {
    let canvas = evt.target.getBoundingClientRect();
    return {
        x: evt.clientX - canvas.left,
        y: evt.clientY - canvas.top
    };
}

function calculateCoordinate(coordinateValue) {
    let gridVal = parseInt($(ids.settings).data("grid-size"));
    return Math.floor(coordinateValue / gridVal) * gridVal;
}

function removeByName(name) {
    
}


let fmgr = null;
let gassets = null;

const selectors = {
    mainFrame: 'main-frame',
    bgFrame: 'bg-frame',
    buttonRemoveMode: 'remove-mode',
};

const classes = {
    infoPanel: '.info-panel',
    objectSelected: '.object-selected',
    removeModeIndicator: '.remove-mode-indicator'
};

const ids = {
    buttonRemoveMode: '#' + selectors.buttonRemoveMode,
    mainFrame: '#' + selectors.mainFrame,
    statuses: "#statuses",
    settings: "#settings"
};

const user = {
  name: "John",
  email: "john@ru.ru",
  set title(val) {
      [this.name, this.email] = val.split(";");
  },
  get title() {
      return `${this.name}(${this.email})`;
  }
};


jQuery(document).ready(function ($) {
    console.log("document initialized");
    let frameStyling = [
        'base-frame-border'
    ];
    let factoryManager = new FactoryManager(new Drawer(new Frame(selectors.mainFrame, 1280, 700, frameStyling)));
    let backgroundDrawer = new BackgroundDrawer(new Frame(selectors.bgFrame, 1280, 700, frameStyling));
    backgroundDrawer.drawBg();
    let evtMgr = new EventManager();
    new ImageLoader(imageData, factoryManager).load();


    evtMgr.addRemoveModeButtonEvent(ids.buttonRemoveMode);
    evtMgr.addClickOnFrameEvent(ids.mainFrame);

    fmgr = factoryManager;

});


