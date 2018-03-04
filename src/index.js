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
    delete(){
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.ancre);
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
    delete(){
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.ancre);
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
    delete(){
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.ancre);
    }
}


class Forme {
    constructor(_x, _y, _id, _nb) {
        this.ancre = new Ancre(_x, _y, this.id);
        this.color = "yellow";
        this.epaisseur = 2;
        this.borderColor = "black";
        this.dasharray = " ";
        this.id = _id;
        this.nb = _nb;
        this.selected = false;
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
        this.newRect.setAttribute("stroke-width", 2);
        this.newRect.setAttribute("stroke-dasharray", " ");
        this.newRect.setAttribute("name", "false");
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
        this.newRect.setAttribute("stroke", this.borderColor);
        this.newRect.setAttribute("stroke-width", this.epaisseur);
        this.newRect.setAttribute("stroke-dasharray", this.dasharray);
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
        this.newRect.setAttribute("name", "true");
    }
    deselect(){
        this.newRect.setAttribute("stroke", this.borderColor);
        this.newRect.setAttribute("name", "false")
    }
    changeColor(col){
      this.color = col;
      this.alter_rect();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_rect();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_rect();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_rect();
    }
    del(){
      this.resize.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newRect);
    }
};

class Carre extends Forme {
    constructor(_id){
        super(50, 50, _id);
        this.newSquare = document.createElementNS(svg, "rect");
        this.newSquare.setAttribute("id", this.id);
        this.newSquare.setAttribute("class", "draggable");
        this.newSquare.setAttribute("width", 80);
        this.newSquare.setAttribute("height", 80);
        this.newSquare.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
        this.newSquare.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
        this.newSquare.setAttribute("fill", "yellow");
        this.newSquare.setAttribute("stroke", "black");
        this.newSquare.setAttribute("stroke-width", 2);
        this.newSquare.setAttribute("stroke-dasharray", " ");
        this.newSquare.setAttribute("name", "false");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newSquare);
        this.resize = new rect_resize(this.ancre.x + 80, this.ancre.y + 80, _id);
        this.width = this.resize.x - this.ancre.x;
        this.height = this.resize.y - this.ancre.y;
    }
    alter_Square(){
        this.resize.alter_rect_resize();
        this.newSquare.setAttribute("id", this.id);
        this.newSquare.setAttribute("class", "draggable");
        this.newSquare.setAttribute("width", this.resize.x - this.ancre.x);
        this.newSquare.setAttribute("height", this.resize.y - this.ancre.y);
        this.newSquare.setAttribute("x", (this.ancre.x + this.ancre.taille/2));
        this.newSquare.setAttribute("y", (this.ancre.y + this.ancre.taille/2));
        this.newSquare.setAttribute("fill", this.color);
        this.newSquare.setAttribute("stroke", this.borderColor);
        this.newSquare.setAttribute("stroke-width", this.epaisseur);
        this.newSquare.setAttribute("stroke-dasharray", this.dasharray);
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.alter_Square();
        var forme_actu = document.getElementById(this.id);
    }
    redim(dx, dy){
      //if (dx == dy){
        if (!(((this.resize.x+dx) - (this.ancre.x))<=0 || ((this.resize.y+dy) - (this.ancre.y))<=0)){
            this.resize.setdx(dx);
            this.resize.setdy(dx);
            this.alter_Square();
        }
      //}
    }
    select(){
        this.newSquare.setAttribute("stroke", "blue");
        this.newSquare.setAttribute("name", "true");
    }
    deselect(){
        this.newSquare.setAttribute("stroke", this.borderColor);
        this.newSquare.setAttribute("name", "false")
    }
    changeColor(col){
      this.color = col;
      this.alter_Square();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_Square();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_Square();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_Square();
    }
    del(){
      this.resize.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newSquare);
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
        this.newCircle.setAttribute("stroke-width", 2);
        this.newCircle.setAttribute("name", "false");
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
        this.newCircle.setAttribute("stroke", this.borderColor);
        this.newCircle.setAttribute("stroke-width", this.epaisseur);
        this.newCircle.setAttribute("stroke-dasharray", this.dasharray);
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
        this.newCircle.setAttribute("name", "true");
    }
    deselect(){
        this.newCircle.setAttribute("stroke", this.borderColor);
        this.newCircle.setAttribute("name", "false")
    }
    changeColor(col){
      this.color = col;
      this.alter_circle();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_circle();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_circle();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_circle();
    }
    del(){
      this.resize.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newCircle);
    }
};

class Ellipse extends Forme {
    constructor(_id) {
        super(50, 50, _id);
        this.rayon = 50;
        this.newEllipse = document.createElementNS(svg, "ellipse");
        this.newEllipse.setAttribute("id", this.id);
        this.newEllipse.setAttribute("class", "draggable");
        this.newEllipse.setAttribute("cx", this.ancre.x);
        this.newEllipse.setAttribute("cy", this.ancre.y);
        this.newEllipse.setAttribute("rx", this.rayon*1.5);
        this.newEllipse.setAttribute("ry", this.rayon);
        this.newEllipse.setAttribute("fill", this.color);
        this.newEllipse.setAttribute("stroke", this.borderColor);
        this.newEllipse.setAttribute("stroke-width", this.epaisseur);
        this.newEllipse.setAttribute("stroke-dasharray", this.dasharray);
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newEllipse);
        this.resize = new circle_resize((this.ancre.x+(this.rayon*1.5)-this.ancre.taille/2), (this.ancre.y+this.rayon-this.ancre.taille/2), this.id);
    }
    alter_Ellipse(){
        this.resize.alter_circle_resize();
        this.newEllipse.setAttribute("id", this.id);
        this.newEllipse.setAttribute("class", "draggable");
        this.newEllipse.setAttribute("cx", this.ancre.x);
        this.newEllipse.setAttribute("cy", this.ancre.y);
        this.newEllipse.setAttribute("rx", (this.resize.x-this.ancre.x+4));
        this.newEllipse.setAttribute("ry", (this.resize.y-this.ancre.y+4));
        this.newEllipse.setAttribute("fill", this.color);
        this.newEllipse.setAttribute("stroke", this.borderColor);
        this.newEllipse.setAttribute("stroke-width", this.epaisseur);
        this.newEllipse.setAttribute("stroke-dasharray", this.dasharray);
    }
    move(x, y){
        this.ancre.setdx(x);
        this.ancre.setdy(y);
        this.resize.setdx(x);
        this.resize.setdy(y);
        this.alter_Ellipse();
    }
    redim(dx, dy){
      if (!(((this.resize.x+dx) - (this.ancre.x))<=0 || ((this.resize.y+dy) - (this.ancre.y))<=0)){
        this.resize.setdx(dx);
        this.resize.setdy(dy);
        this.alter_Ellipse();
      }
    }
    select(){
        this.newEllipse.setAttribute("stroke", "blue");
        this.newEllipse.setAttribute("name", "true");
    }
    deselect(){
        this.newEllipse.setAttribute("stroke", this.borderColor);
        this.newEllipse.setAttribute("name", "false")
    }
    changeColor(col){
      this.color = col;
      this.alter_Ellipse();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_Ellipse();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_Ellipse();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_Ellipse();
    }
    del(){
      this.resize.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newEllipse);
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
        this.newLine.setAttribute("name", "false");
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
        this.newLine.setAttribute("stroke", this.color);
        this.newLine.setAttribute("stroke-width", this.epaisseur);
        this.newLine.setAttribute("stroke-dasharray", this.dasharray);
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
        this.newLine.setAttribute("name", "true");
    }
    deselect(){
        this.newLine.setAttribute("stroke", this.color);
        this.newLine.setAttribute("name", "false");
    }
    changeColor(col){
      this.color = col;
      this.alter_Ligne();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_Ligne();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_Ligne();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_Ligne();
    }
    del(){
      this.ancre1.delete();
      this.ancre2.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newLine);
    }
}

class Polyligne extends Forme{
    constructor(_id, _nb) {
        super(50, 50, _id, _nb);
        this.newPoliline = document.createElementNS(svg, "polyline");
        this.newPoliline.setAttribute("id", this.id);
        this.newPoliline.setAttribute("class", "draggable");
        this.newPoliline.setAttribute("points", this.nbPolylinesfct());
        this.newPoliline.setAttribute("stroke", "red");
        this.newPoliline.setAttribute("stroke-width", "4");
        this.newPoliline.setAttribute("name", "false");
        var svgDoc = document.querySelector('svg');
        svgDoc.appendChild(this.newPoliline);
        this.ancre1 = new Ligne_ancre(50, 50, _id, 1);
        this.ancre2 = new Ligne_ancre(150, 50, _id, 2);
    }
    alter_polyLigne(){
        this.ancre1.alter_Ligne_ancre();
        this.ancre2.alter_Ligne_ancre();
        this.newPoliline.setAttribute("id", this.id);
        this.newPoliline.setAttribute("class", "draggable");
        this.newPoliline.setAttribute("points", this.nbPolylinesfct());
        this.newPoliline.setAttribute("stroke", "red");
        this.newPoliline.setAttribute("stroke-width", "4");
        this.newPoliline.setAttribute("name", "false");
        this.newPoliline.setAttribute("fill", this.color);

    }
    move(x, y){
        this.ancre1.setdx(x);
        this.ancre1.setdy(y);
        this.ancre2.setdx(x);
        this.ancre2.setdy(y);
        this.alter_polyLigne();
    }
    redim(dx, dy, who){
      if(who == 1){
        this.ancre1.setdx(dx);
        this.ancre1.setdy(dy);
      }else {
        this.ancre2.setdx(dx);
        this.ancre2.setdy(dy);
      }
        this.alter_polyLigne();
    }
    select(){
        this.newPoliline.setAttribute("stroke", "yellow");
        this.newPoliline.setAttribute("name", "true");
    }
    deselect(){
        this.newPoliline.setAttribute("stroke", "red");
        this.newPoliline.setAttribute("name", "false");
    }
    nbPolylinesfct(){
        if (this._nb = 1) {
            return "50,50 150,50"
        }
        else if (this._nb >1) {
            var points = " ";
            for (var i = 0; i <= nb; i++) {
                points += '"' + Math.floor(Math.random() * 100) + ',' + Math.floor(Math.random() * 100) + ' "';
                console.log(points);
                return points;
            }
        }
    }
    changeColor(col){
      this.color = col;
      this.alter_polyLigne();
    }
    changeEpaisseur(ep){
      this.epaisseur = ep;
      this.alter_polyLigne();
    }
    changeDash(dash){
      this.dasharray = dash;
      this.alter_polyLigne();
    }
    changeColorBorder(color){
      this.borderColor = color;
      this.alter_polyLigne();
    }
    del(){
      this.ancre1.delete();
      this.ancre2.delete();
      var svgDoc = document.querySelector('svg');
      svgDoc.removeChild(this.newPoliline);
    }
}

class Formes{
    constructor(){
        this.formes = new Array();
    }
    addForme(type, id, nb){
        if (type == "rect"){
            this.formes[id] = new Rectangle(id);
        }
        else if (type == "square"){
            this.formes[id] = new Carre(id);
        }
        else if (type == "circle"){
            this.formes[id] = new Circle(id);
        }
        else if (type == "ellipse"){
            this.formes[id] = new Ellipse(id);
        }
        else if (type == "ligne"){
            this.formes[id] = new Ligne(id);
        }
        else if (type == "polyligne"){
            this.formes[id] = new Polyligne(id, nb);
        }
        /*else if (type == "polygone"){
            this.formes[id] = new Polygone(id);
        }*/
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

    //fonctions associés aux boutons pour ajouter des formes

    var drawRect = document.getElementById('rect');
    drawRect.onclick = function cree_rectangle(evt) {
        canvas.addForme("rect", attrib_id());
        console.log(svgDoc);
    }

    var drawSquare = document.getElementById('square');
    drawSquare.onclick = function cree_carre(evt) {
        canvas.addForme("square", attrib_id());
        console.log(svgDoc);
    }

    var drawCircle = document.getElementById('circle');
    drawCircle.onclick = function cree_cercle(evt) {
        canvas.addForme("circle", attrib_id());
        console.log(svgDoc);
    }

    var drawEllipse = document.getElementById('ellipse');
    drawEllipse.onclick = function cree_ellipse(evt) {
        canvas.addForme("ellipse", attrib_id());
        console.log(svgDoc);
    }

    var drawLine = document.getElementById('ligne');
    drawLine.onclick = function cree_ligne(evt) {
        canvas.addForme("ligne", attrib_id());
        console.log(svgDoc);
    }

    var drawPolyline = document.getElementById('polyline');
    drawPolyline.onclick = function cree_polyline(evt) {
        var nbPolylines = prompt('Entrez le nombre de lignes voulues','Entrez un nombre');
        canvas.addForme("polyligne", attrib_id(), nbPolylines);
        console.log(svgDoc);
    }

    var drawPolygone = document.getElementById('polygone');
    drawPolygone.onclick = function cree_polygone(evt) {
        var nbFaces = prompt('Entrez le nombre de faces voulues','Entrez un nombre');
        canvas.addForme("polygone", attrib_id(), nbFaces);
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

    //couleur des formes

    var couleur_gris = document.getElementById('grey');
    var formeSelected = document.getElementsByName('true');
    couleur_gris.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("grey");
      }
    }

    var couleur_red = document.getElementById('red');
    couleur_red.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("red");
      }
    }

    var couleur_green = document.getElementById('green');
    couleur_green.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("green");
      }
    }

    var couleur_blue = document.getElementById('blue');
    couleur_blue.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("blue");
      }
    }

    var couleur_yellow = document.getElementById('yellow');
    couleur_yellow.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("yellow");
      }
    }

    var couleur_black = document.getElementById('black');
    couleur_black.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("black");
      }
    }

    var couleur_white = document.getElementById('white');
    couleur_white.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColor("white");
      }
    }

    var rotation = document.getElementById('rotate');
    rotation.onclick = function() {
        var angle = prompt("Entrez un angle de rotation pour la ou les formes sélectionnées", "Entrez un nombre")
        for (var i = 0; i <= formeSelected.length; i++)
            formeSelected[i].setAttribute("transform", "rotate("+angle+")");
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

    //forme et epaisseur des bordures

    var border_moins = document.getElementById('moins');
    border_moins.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeEpaisseur(formeSelected[i].getAttributeNS(null, "stroke-width")-1);
      }
    }

    var border_plus = document.getElementById('plus');
    border_plus.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeEpaisseur(parseFloat(formeSelected[i].getAttributeNS(null, "stroke-width"))+1);
      }
    }

    var border_droit = document.getElementById('droit');
    border_droit.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeDash(" ");
      }
    }

    var border_dash1 = document.getElementById('dash1');
    border_dash1.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeDash("5,5");
      }
    }

    var border_dash2 = document.getElementById('dash2');
    border_dash2.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeDash("10,10");
        }
    }

    var border_dash3 = document.getElementById('dash3');
    border_dash3.onclick = function(evt) {
        for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeDash("20,10,5,5,5,10");
      }
    }


    //couleur des bordures

    var border_couleur_gris = document.getElementById('border_grey');
    border_couleur_gris.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("grey");
      }
    }

    var border_couleur_red = document.getElementById('border_red');
    border_couleur_red.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("red");
      }
    }

    var border_couleur_green = document.getElementById('border_green');
    border_couleur_green.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("green");
      }
    }

    var border_couleur_blue = document.getElementById('border_blue');
    border_couleur_blue.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("blue");
      }
    }

    var border_couleur_yellow = document.getElementById('border_yellow');
    border_couleur_yellow.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("yellow");
      }
    }

    var border_couleur_black = document.getElementById('border_black');
    border_couleur_black.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("black");
      }
    }

    var border_couleur_white = document.getElementById('border_white');
    border_couleur_white.onclick = function(evt) {
      for (var i = 0; i <= formeSelected.length; i++){
          var idforme = formeSelected[i].getAttributeNS(null, "id");
          canvas.formes[idforme].changeColorBorder("white");
      }
    }

    var supprimer = document.getElementById('supprimer');
    supprimer.onclick = function() {
        if (confirm("Voulez-vous supprimer la forme ?")) {
            div_couleur.style.display = 'none';
            div_bordure.style.display = 'none';
            for (var i = 0; i <= formeSelected.length; i++){
                console.log(i);
                console.log(formeSelected);
                var idforme = formeSelected[i].getAttributeNS(null, "id");
                console.log(idforme);
                canvas.formes[idforme].del();
                console.log(svgDoc);
            }
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
          if (formeSelected != null) {
              for (var i = 0; i <= formeSelected.length; i++){
                  canvas.formes[i].deselect();
              }
              canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].select();
          }
          else {
            canvas.formes[parseFloat(selectedElement.getAttributeNS(null, "id"))].select();
          }
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
