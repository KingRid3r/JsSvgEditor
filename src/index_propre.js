

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