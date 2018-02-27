require("./stylesheets/styles.scss");
var svg = "http://www.w3.org/2000/svg";

var attrib_id = (function() {
    var id = 0;
    return function(se){return id++;};
}) ();

class Ancre {
    constructor(x, y, id, type) {
        this._type = type;
        this._x = x;
        this._y = y;
        this._id = id;
        this._taille = 8;
        if (this._type == "origin"){

        }
        else if(this._type == "rect_resize"){
            this.ancre = document.createElementNS(svg, "rect");
            this.ancre.setAttribute("id", this._id);
            this.ancre.setAttribute("class", "resize");
            this.ancre.setAttribute("width", this.taille);
            this.ancre.setAttribute("height", this.taille);
            this.ancre.setAttribute("x", this._x);
            this.ancre.setAttribute("y", this._y);
            this.ancre.setAttribute("fill", "black");
            this.ancre.setAttribute("type", this._type);
            var svgDoc = document.querySelector('svg');
            svgDoc.appendChild(this.ancre);
        }
        else if(this._type == "circle_resize" || this._type == "line_adjust"){
            this.ancre = document.createElementNS(svg, "rect");
            this.ancre.setAttribute("id", this._id);
            this.ancre.setAttribute("class", "resize_ew");
            this.ancre.setAttribute("width", this.taille);
            this.ancre.setAttribute("height", this.taille);
            this.ancre.setAttribute("x", this._x);
            this.ancre.setAttribute("y", this._y);
            this.ancre.setAttribute("fill", "black");
            var svgDoc = document.querySelector('svg');
            svgDoc.appendChild(this.ancre);
        }
    }
    get x() { return this._x};
    get y() { return this._y};
    setdx(x) { this._x += x};
    setdy(y) { this._y += y};
    get taille() { return this._taille};
    moveancre(){
        if (this._type == "rect_resize" || this._type == "circle_resize" || this._type == "line_adjust") {
            this.ancre.setAttribute("x", this._x);
            this.ancre.setAttribute("y", this._y);
        }
    }
    move(x, y){
        this.setdx(x);
        this.setdy(y);
        this.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("x", this.x);
        forme_actu.setAttribute("y", this.y);
    }
};

class Forme {
    constructor(ide) {
        this.ancre = new Ancre(50, 50, this.id, "origin");
        this.color = "yellow";
        this.id = "forme"+ide;
    }
    dessinerAncre() {

    }
};

class Rectangle extends Forme {
    constructor(ide) {
        super();
        this.id = ide;
        this.hauteur = 80;
        this.largeur = 120;
        let newRect = document.createElementNS(svg, "rect");
            newRect.setAttribute("id", this.id);
            newRect.setAttribute("class", "draggable");
            newRect.setAttribute("width", this.largeur);
            newRect.setAttribute("height", this.hauteur);
            newRect.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
            newRect.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
            newRect.setAttribute("fill", this.color);
            newRect.setAttribute("stroke", "black");
            var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(newRect);
        this.resize = new Ancre((this.ancre.x+this.largeur), (this.ancre.y+this.hauteur), this.id, "rect_resize");
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.resize.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
        forme_actu.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
        forme_actu.setAttribute("width", (this.resize.x - this.ancre.x));
        forme_actu.setAttribute("height", (this.resize.y - this.ancre.y));

    }
    redim(dx, dy){
        this.resize.move(dx, dy);
        this.resize.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("width", (this.resize.x - this.ancre.x));
        forme_actu.setAttribute("height", (this.resize.y - this.ancre.y));
    }
    /*resize(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.resize.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("width", (this.ancre.x + this.resize.x));
        forme_actu.setAttribute("height", (this.ancre.y + this.resize.y));
    }*/
};

class Circle extends Forme {
    constructor(ide) {
        super();
        this.id = ide;
        this.rayon = 40;
        let newCircle = document.createElementNS(svg, "circle");
            newCircle.setAttribute("id", this.id);
            newCircle.setAttribute("class", "draggable");
            newCircle.setAttribute("cx", this.ancre.x);
            newCircle.setAttribute("cy", this.ancre.y);
            newCircle.setAttribute("r", this.rayon);
            newCircle.setAttribute("fill", this.color);
            newCircle.setAttribute("stroke", "black");
            var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(newCircle);
        this.resize = new Ancre((this.ancre.x+this.rayon-this.ancre.taille/2), (this.ancre.y), this.id, "circle_resize");
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.resize.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("cx", (this.ancre.x + this.ancre.taille/2));
        forme_actu.setAttribute("cy", (this.ancre.y + this.ancre.taille/2));
    };
}

class Ligne extends Forme {
    constructor(ide) {
        super();
        this.id = ide;
        let newLine = document.createElementNS(svg, "line");
            newLine.setAttribute("id", this.id);
            newLine.setAttribute("class", "draggable");
            newLine.setAttribute("x1", this.ancre.x);
            newLine.setAttribute("y1", this.ancre.y);
            newLine.setAttribute("x2", (this.ancre.x+100));
            newLine.setAttribute("y2", this.ancre.y);
            newLine.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:4");
            var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(newLine);
        this.gauche = new Ancre((this.ancre.x-this.ancre.taille/2), (this.ancre.y-this.ancre.taille/2), this.id, "line_adjust");
        this.droite = new Ancre((this.ancre.x+100-this.ancre.taille/2), (this.ancre.y-this.ancre.taille/2), this.id, "line_adjust");
    }
    move(x, y){
        this.gauche.setdx(x);
        this.gauche.setdy(y);
        this.droite.setdx(x);
        this.droite.setdy(y);
        this.gauche.moveancre();
        this.droite.moveancre();
        var forme_actu = document.getElementById(this.id);
        forme_actu.setAttribute("x1", (this.gauche.x+this.ancre.taille/2));
        forme_actu.setAttribute("y1", (this.gauche.y+this.ancre.taille/2));
        forme_actu.setAttribute("x2", (this.droite.x+this.ancre.taille/2));
        forme_actu.setAttribute("y2", (this.droite.y+this.ancre.taille/2));
    };
}

class Formes{
    constructor(type, id){
        this.formes = new Array();
    }
    addForme(type, id){
        if (type == "rect"){
            this.formes[id] = new Rectangle(id);
        }
        else if (type == "circle"){
            this.formes[id] = new Circle(id);
        }
        else if (type == "ligne"){
            this.formes[id] = new Ligne(id);
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
        canvas.addForme("circle", attrib_id());
        console.log(svgDoc);
    }

    var drawRect = document.getElementById('rect');
    drawRect.onclick = function cree_rectangle(evt) {
        canvas.addForme("rect", attrib_id());
        console.log(svgDoc);
    }

    var drawLine = document.getElementById('ligne');
    drawLine.onclick = function cree_rectangle(evt) {
        canvas.addForme("ligne", attrib_id());
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
                            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].redim(dx, dy);
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















 /*var pt = svgDoc.createSVGPoint();


    function cursorPoint(evt){
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        //il manque une transformation si le canvas est décalé ou tourné ...


    svgDoc.addEventListener('mousemove', function(evt) {
        var loc = cursorPoint(evt);
        var coords = new Object();
        coords.X = pt.x;
        coords.Y = pt.y;
        var coordoonees = document.querySelector('#coordo');
        coordoonees.innerHTML = "Coordonnés du curseur : X = " + coords.X + " ; Y = " + coords.Y;
    }, false);*/
