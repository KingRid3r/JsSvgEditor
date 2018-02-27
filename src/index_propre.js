class Proxy{
    constructor(_x, _y, _id){
        this.x = _x;
        this.y = _y;
        this.idparent = _id;
        this.taille = 8;
    }
    get x() { return this.x};
    get y() { return this.y};
    setdx(_x) { this.x += _x};
    setdy(_y) { this.y += _y};
    get taille() { return this.taille};
};

class Ancre extends Proxy{
    constructor(_x, _y, _id){
        super();
    }
};

class Forme {
    constructor(_id) {
        this.ancre = new Ancre(50, 50, this.id);
        this.color = "yellow";
        this.id = _id;
    }
};

class Rectangle extends Forme {
    constructor(ide){
        super();
    }
};

class Formes{
    constructor(type, id){
        this.formes = new Array();
    }
    addForme(type, id){
        if (type == "rect"){
            this.formes[id] = new Rectangle(id);
        }
        else if (type == "circle"){
        //    this.formes[id] = new Circle(id);
        }
        else if (type == "ligne"){
        //    this.formes[id] = new Ligne(id);
        }
    }
};

function initScript()
{
    var svg = "http://www.w3.org/2000/svg";
    var svgDoc = document.querySelector('svg');
    var canvas = new Formes;
   
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    var drawCircle = document.getElementById('circle');
    drawCircle.onclick = function cree_cercle(evt) {
        //canvas.addForme("circle", attrib_id());
        console.log(svgDoc);
    }

    var drawRect = document.getElementById('rect');
    drawRect.onclick = function cree_rectangle(evt) {
        canvas.addForme("rect", attrib_id());
        console.log(svgDoc);
    }

    var drawLine = document.getElementById('ligne');
    drawLine.onclick = function cree_rectangle(evt) {
        //canvas.addForme("ligne", attrib_id());
        console.log(svgDoc);
    }

    var selectedElement = 0;
    var currentX = 0;
    var currentY = 0;
    var formeX = 0;
    var formeY = 0;

    svgDoc.addEventListener('mousedown', function(evt) {
        selectedElement = evt.target;
        currentX = evt.clientX;
        currentY = evt.clientY;
        formeX = parseFloat(selectedElement.getAttributeNS(null, "x"));
        formeY = parseFloat(selectedElement.getAttributeNS(null, "y"));

        var onmousemove = function(evt) {
            selectedElement = evt.target;
            var dx = evt.clientX - currentX;
            var dy = evt.clientY - currentY;
            //formeX += dx;
            //formeY += dy;
            if(selectedElement!=0)
            {
                if (selectedElement != svgDoc) {
                        if (selectedElement.getAttributeNS(null, "type") == "rect_resize"){
                        //    canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].redim(dx, dy);
                        }else{
                            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].move(dx, dy);
                        }
                }
            //    selectedElement.setAttribute("x", formeX);
            //    selectedElement.setAttribute("y", formeY);
            }
            currentX = evt.clientX;
            currentY = evt.clientY;
        };

        svgDoc.addEventListener('mousemove', onmousemove, false);

        svgDoc.addEventListener('mouseup', function(evt) {
            if (selectedElement != 0) {
                selectedElement = 0;
            }
            svgDoc.removeEventListener('mousemove', onmousemove);
        }, false);
    }, false);
        


}
window.addEventListener('load',initScript);