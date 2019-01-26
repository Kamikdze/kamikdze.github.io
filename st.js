var button = document.getElementById("convert");
    button.addEventListener('click', function () {
        a = document.getElementById("a").value;
        if (a > 50) {
            alert("жара");
        } else if (a > 30) {
            alert("тепло");
        } else if (a > 10) {
            alert("нормально");
        } else if (a > -10) {
            alert("холодно")
        }
Z(a)
    });
    function Z (T){ 
        for(let i=0; i<=T; i=i+2){
            console.log(i);
        }

    }


