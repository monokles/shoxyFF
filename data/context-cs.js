self.on("click", function(node, data) { 
    if(node.nodeName === "A") {
        self.postMessage(node.href); 
    } else {
        self.postMessage(node.src); 
    }
});
