require("./stylesheets/styles.scss");
var svg = "http://www.w3.org/2000/svg";

var attrib_id = (function() {
    var id = 0;
    return function(se){return id++;};
}) ();

class Proxy{
    constructor(_x, _y, _id){
        this.x = _x;
        this.y = _y;
        this.idparent = _id;
        this.taille = 8;
    }
    //get x() { return this.x};
    //get y() { return this.y};
    setdx(_x) { this.x += _x};
    setdy(_y) { this.y += _y};
    //get taille() { return this.taille};
};

class Ancre extends Proxy{
    constructor(_x, _y, _id){
        super(_x, _y, _id);
    }
};
class rect_resize extends Proxy{
    constructor(_x, _y, _id) {
        super(_x, _y, _id);
        this.ancre = document.createElementNS(svg, "rect");
        this.ancre.setAttribute("idparent", this.idparent);
        this.ancre.setAttribute("class", "resize");
        this.ancre.setAttribute("width", this.taille);
        this.ancre.setAttribute("height", this.taille);
        this.ancre.setAttribute("x", this.x);
        this.ancre.setAttribute("y", this.y);
        this.ancre.setAttribute("fill", "black");
        this.ancre.setAttribute("type", "resize");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.ancre);
    };
    alter_rect_resize(){
        this.ancre.setAttribute("idparent", this.idparent);
        this.ancre.setAttribute("class", "resize");
        this.ancre.setAttribute("width", this.taille);
        this.ancre.setAttribute("height", this.taille);
        this.ancre.setAttribute("x", this.x);
        this.ancre.setAttribute("y", this.y);
        this.ancre.setAttribute("fill", "black");
    }
    deselect(){
        this.newCircle.setAttribute("fill", "yellow");
    }
    select(){
        this.newRect.setAttribute("fill", "green");
    }
    deselect(){
        this.newRect.setAttribute("fill", "yellow");
    }
}

class circle_resize extends Proxy{
    constructor(_x, _y, _id) {
        super(_x, _y, _id);
        this.ancre = document.createElementNS(svg, "rect");
        this.ancre.setAttribute("idparent", this.idparent);
        this.ancre.setAttribute("class", "resize_ew");
        this.ancre.setAttribute("width", this.taille);
        this.ancre.setAttribute("height", this.taille);
        this.ancre.setAttribute("x", this.x);
        this.ancre.setAttribute("y", this.y);
        this.ancre.setAttribute("fill", "black");
        this.ancre.setAttribute("type", "resize");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.ancre);
    }
    alter_circle_resize(){
        this.ancre.setAttribute("idparent", this.idparent);
        this.ancre.setAttribute("class", "resize_ew");
        this.ancre.setAttribute("width", this.taille);
        this.ancre.setAttribute("height", this.taille);
        this.ancre.setAttribute("x", this.x);
        this.ancre.setAttribute("y", this.y);
        this.ancre.setAttribute("fill", "black");
    }
    select(){
        this.newRect.setAttribute("fill", "green");
    }
    deselect(){
        this.newRect.setAttribute("fill", "yellow");
    }

};

class Ligne_ancre extends Proxy{
    constructor(_x, _y, _id, who) {
        super(_x, _y, _id);
        this.ancre = document.createElementNS(svg, "rect");
        this.ancre.setAttribute("idparent", this.idparent);
        this.ancre.setAttribute("class", "draggable");
        this.ancre.setAttribute("width", this.taille);
        this.ancre.setAttribute("height", this.taille);
        this.ancre.setAttribute("x", this.x-4);
        this.ancre.setAttribute("y", this.y-4);
        this.ancre.setAttribute("fill", "black");
        this.ancre.setAttribute("type", "ligne_resize");
        this.ancre.setAttribute("who", who);
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.ancre);
    }
    alter_Ligne_ancre(){
      this.ancre.setAttribute("idparent", this.idparent);
      this.ancre.setAttribute("class", "draggable");
      this.ancre.setAttribute("width", this.taille);
      this.ancre.setAttribute("height", this.taille);
      this.ancre.setAttribute("x", this.x-4);
      this.ancre.setAttribute("y", this.y-4);
      this.ancre.setAttribute("fill", "black");
    }
}


class Forme {
    constructor(_x, _y, _id) {
        this.ancre = new Ancre(_x, _y, this.id);
        this.color = "yellow";
        this.id = _id;
    }
};

class Rectangle extends Forme {
    constructor(_id){
        super(50, 50, _id);
        this.newRect = document.createElementNS(svg, "rect");
        this.newRect.setAttribute("id", this.id);
        this.newRect.setAttribute("class", "draggable");
        this.newRect.setAttribute("width", 80);
        this.newRect.setAttribute("height", 120);
        this.newRect.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
        this.newRect.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
        this.newRect.setAttribute("fill", this.color);
        this.newRect.setAttribute("stroke", "black");
        this.newRect.setAttribute("selected", "false");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newRect);
        this.resize = new rect_resize(this.ancre.x + 80, this.ancre.y +120, _id);
        this.width = this.resize.x - this.ancre.x;
        this.height = this.resize.y - this.ancre.y;
    }
    alter_rect(){
        this.resize.alter_rect_resize();
        this.newRect.setAttribute("id", this.id);
        this.newRect.setAttribute("class", "draggable");
        this.newRect.setAttribute("width", this.resize.x - this.ancre.x);
        this.newRect.setAttribute("height", this.resize.y - this.ancre.y);
        this.newRect.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
        this.newRect.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
        this.newRect.setAttribute("fill", this.color);
        this.newRect.setAttribute("stroke", "black");
        this.newRect.setAttribute("selected", "false");
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.alter_rect();
        var forme_actu = document.getElementById(this.id);
    }
    redim(dx, dy){
      if (!(((this.resize.x+dx) - (this.ancre.x))<=0 || ((this.resize.y+dy) - (this.ancre.y))<=0)){
        this.resize.setdx(dx);
        this.resize.setdy(dy);
        this.alter_rect();
      }
    }
    select(){
        this.newRect.setAttribute("stroke", "blue");
        this.newRect.setAttribute("selected", "true");
    }
    deselect(){
        this.newRect.setAttribute("stroke", "black");
        this.newRect.setAttribute("selected", "false")
    }
};

class Circle extends Forme {
    constructor(_id) {
        super(50, 50, _id);
        this.rayon = 40;
        this.newCircle = document.createElementNS(svg, "circle");
        this.newCircle.setAttribute("id", this.id);
        this.newCircle.setAttribute("class", "draggable");
        this.newCircle.setAttribute("cx", this.ancre.x);
        this.newCircle.setAttribute("cy", this.ancre.y);
        this.newCircle.setAttribute("r", this.rayon);
        this.newCircle.setAttribute("fill", this.color);
        this.newCircle.setAttribute("stroke", "black");
        this.newCircle.setAttribute("selected", "false");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newCircle);
        this.resize = new circle_resize((this.ancre.x+this.rayon-this.ancre.taille/2), (this.ancre.y), this.id);
    }
    alter_circle(){
        this.resize.alter_circle_resize();
        this.newCircle.setAttribute("id", this.id);
        this.newCircle.setAttribute("class", "draggable");
        this.newCircle.setAttribute("cx", this.ancre.x);
        this.newCircle.setAttribute("cy", this.ancre.y);
        this.newCircle.setAttribute("r", (this.resize.x-this.ancre.x+4));
        this.newCircle.setAttribute("fill", this.color);
        this.newCircle.setAttribute("stroke", "black");
        this.newCircle.setAttribute("selected", "false");
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.alter_circle();
    }
    redim(dx, dy){
      if(!((this.resize.x-this.ancre.x+4+dx)<=0)){
        this.resize.setdx(dx);
        this.alter_circle();
      }
    }
    select(){
        this.newCircle.setAttribute("stroke", "blue");
        this.newCircle.setAttribute("selected", "true");
    }
    deselect(){
        this.newCircle.setAttribute("stroke", "black");
        this.newCircle.setAttribute("selected", "false")
    }
};

class Ligne extends Forme{
    constructor(_id) {
        super(50, 50, _id);
        this.newLine = document.createElementNS(svg, "line");
        this.newLine.setAttribute("id", this.id);
        this.newLine.setAttribute("class", "draggable");
        this.newLine.setAttribute("x1", 50);
        this.newLine.setAttribute("y1", 50);
        this.newLine.setAttribute("x2", (50+100));
        this.newLine.setAttribute("y2", 50);
        this.newLine.setAttribute("stroke", "red");
        this.newLine.setAttribute("stroke-width", "4");
        this.newLine.setAttribute("selected", "false");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newLine);
        this.ancre1 = new Ligne_ancre(50, 50, _id, 1);
        this.ancre2 = new Ligne_ancre(150, 50, _id, 2);
    }
    alter_Ligne(){
        this.ancre1.alter_Ligne_ancre();
        this.ancre2.alter_Ligne_ancre();
        this.newLine.setAttribute("id", this.id);
        this.newLine.setAttribute("class", "draggable");
        this.newLine.setAttribute("x1", this.ancre1.x);
        this.newLine.setAttribute("y1", this.ancre1.y);
        this.newLine.setAttribute("x2", (this.ancre2.x));
        this.newLine.setAttribute("y2", this.ancre2.y);
        this.newLine.setAttribute("stroke", "red");
        this.newLine.setAttribute("stroke-width", "4");
        this.newLine.setAttribute("selected", "false");
    }
    move(x, y){
        this.ancre1.setdx(x);
        this.ancre1.setdy(y);
        this.ancre2.setdx(x);
        this.ancre2.setdy(y);
        this.alter_Ligne();
    }
    redim(dx, dy, who){
      if(who == 1){
        this.ancre1.setdx(dx);
        this.ancre1.setdy(dy);
      }else {
        this.ancre2.setdx(dx);
        this.ancre2.setdy(dy);
      }
        this.alter_Ligne();
    }
    select(){
        this.newLine.setAttribute("stroke", "yellow");
        this.newLine.setAttribute("selected", "true");
    }
    deselect(){
        this.newLine.setAttribute("stroke", "red");
        this.newLine.setAttribute("selected", "false");
    }
}

class Formes{
    constructor(){
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
    drawLine.onclick = function cree_ligne(evt) {
        canvas.addForme("ligne", attrib_id());
        console.log(svgDoc);
    }

    var changeColor = document.getElementById('color');
    var div_couleur = document.getElementById('couleur');
    changeColor.onclick = function() {
        if (div_couleur.style.display == 'none') {
            div_couleur.style.display = 'block';
            div_bordure.style.display = 'none';
        }
        else
        {
            div_couleur.style.display = 'none';
        }
    }


    var couleur_gris = document.getElementById('grey');
    // var formeSelected = document.getElementsByAttribute("selected", "true");
    couleur_gris.onclick = function(evt) {
        if (formeSelected != svgDoc) {
            canvas.formes[parseFloat(formeSelected.getAttributeNS(null, "id"))].setAttribute("fill", "grey");
        }
    }

    var changeBorder = document.getElementById('border');
    var div_bordure = document.getElementById('epais');
    changeBorder.onclick = function() {
        if (div_bordure.style.display == 'none') {
            div_bordure.style.display = 'block';
            div_couleur.style.display = 'none';
        }
        else
        {
            div_bordure.style.display = 'none';
        }
    }

    var supprimer = document.getElementById('supprimer');
    supprimer.onclick = function() {
        if (confirm("Voulez-vous supprimer la forme ?")) {
            div_couleur.style.display = 'none';
            div_bordure.style.display = 'none';
       }
    }

    var selectedElement = 0;
    var currentX = 0;
    var currentY = 0;
    var formeX = 0;
    var formeY = 0;

    svgDoc.addEventListener('click', function(evt) {
        selectedElement = evt.target;

        if (selectedElement != svgDoc) {
            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].select();
        }
        else {
            for (var i = 0; i <= canvas.formes.length; i++) {
                canvas.formes[i].deselect();
            }
        }
    });

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
                        if (selectedElement.getAttributeNS(null, "type") == "resize"){
                            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "idparent"))].redim(dx, dy);
                        }else if(selectedElement.getAttributeNS(null, "type") == "ligne_resize"){
                            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "idparent"))].redim(dx, dy, selectedElement.getAttributeNS(null, "who"));
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
