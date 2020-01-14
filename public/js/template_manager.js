function TemplateManager() {
    let self = this;
    const componentInfoPanel = "<div class=\"row component ${type}\">\n" +
        "                                                <div class=\"col\">\n" +
        "                                                    <span>Name: ${name}</span><br>\n" +
        "                                                    <span>Recipe: ${recipe}</span>\n" +
        "                                                </div>\n" +
        "                                            </div>";

    self.getInfoComponentTmpl = function (component) {
        return componentInfoPanel
            .replace("${name}", component.name)
            .replace("${recipe}", component.recipe)
            .replace("${type}", component.type);
    }

};