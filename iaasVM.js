const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    menu = body.querySelector(".text"),
    homeBG = body.querySelector(".home");
    
    

    toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
    })

    searchBtn.addEventListener("click", () =>{
        sidebar.classList.remove("close");
    })

    modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText = "Light Mode";
        }
        else{
            modeText.innerText = "Dark Mode";

        }
    });




    /* =================================================== Logic =============================================================== */

    /* ======== Select All checkboxes ========*/













    /* ======== Trigger ========*/
    
var http = new XMLHttpRequest();
var PAT = 'u7p4ixbefbcepyve3prgdmwt2gdt6m5nnyeevr6ylhbd4soyj3gq';

var Action;
var Application;
var Environment;
var Locate;
var ResourceGroup;
var VMName;
var VM;
var vm;
var selected = 0;
var m = 1;
var o = 1;



function TriggerReleasePipe() {
    console.log("ëntered pipeline");

    if(Action == "IaaSVM-Start"){
        var TriggerPipeurl = "https://vsrm.dev.azure.com/geico/Billing-DevOps-Automations/_apis/release/releases?api-version=6.1-preview.8";

        http.open('POST', TriggerPipeurl);
        http.setRequestHeader('Authorization', 'Basic' + btoa(":" + PAT));
        http.setRequestHeader('Content-Type', 'application/json');

        var json = {
            definitionId : 37,
            variables:{
                applicationAcronym:{
                    value: Application
                },
                enterpriseSystemAcronym:{
                    value: "ENBILL"
                },
                environmentAcronym:{
                    value: Environment
                },
                resourceGroup:{
                    value: ResourceGroup
                },
                subscriptionId:{
                    value: "894a3654-03bc-4154-9f32-1c746a34e848"
                },
                location:{
                    value: Locate
                },
                vmName:{
                    value: VMName
                }
            }
        };

        var data = JSON.stringify(json);
        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE){
                if (http.status === 200) {
                    console.log("Pipeline Triggered Successfully");
                    //document.getElementById('response').innerHTML = "You've successfully submitted the request";
                } else {
                    console.log("Oops! Error communicating with ADO to trigger pipeline. Received HTTP Status Code " + http.status + " after POST request to " + TriggerPipeurl + ".");
                }
            }
        }
        http.send(data);

    }

    else if(Action == "IaaSVM-Stop"){
        var TriggerPipeurl = "https://vsrm.dev.azure.com/geico/Billing-DevOps-Automations/_apis/release/releases?api-version=6.1-preview.8";

        http.open('POST', TriggerPipeurl);
        http.setRequestHeader('Authorization', 'Basic' + btoa(":" + PAT));
        http.setRequestHeader('Content-Type', 'application/json');

        var json = {
            definitionId : 39,
            variables:{
                applicationAcronym:{
                    value: Application
                },
                enterpriseSystemAcronym:{
                    value: "ENBILL"
                },
                environmentAcronym:{
                    value: Environment
                },
                resourceGroup:{
                    value: ResourceGroup
                },
                subscriptionId:{
                    value: "894a3654-03bc-4154-9f32-1c746a34e848"
                },
                location:{
                    value: Locate
                },
                vmName:{
                    value: VMName
                }
            }
        };

        var data = JSON.stringify(json);
        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE){
                if (http.status === 200) {
                    console.log("Pipeline Triggered Successfully");
                    //document.getElementById('response').innerHTML = "You've successfully submitted the request";

                } else {
                    console.log("Oops! Error communicating with ADO to trigger pipeline. Received HTTP Status Code " + http.status + " after POST request to " + TriggerPipeurl + ".");
                }
            }
        }
        http.send(data);
    }
    
}


function submitForm() {
   // document.getElementById('mylabel').innerHTML = '';

    var form_data = document.getElementById('order');

    var input1 = form_data[0];
    if (input1 !== undefined) {
        Action = input1.options[input1.selectedIndex].text;
    }

    var input2 = form_data[1];
    if (input2 !== undefined) {
        Environment = input2.options[input2.selectedIndex].text;
    }

    var input3 = form_data[2];
    if (input3 !== undefined) {
        Application = input3.options[input3.selectedIndex].text;
    }

    
    if(Environment == "lt1" || "lt2" || "sb2") {
        ResourceGroup = "gze-" + Application + "-" + Environment + "-rgp-001";
        Locate = "East US";
        if(selected == 1){
            vm = "";
            VMName = "";
            console.log(VM);
            VMName = VM;
        }
        else if( selected == 0){
            VM = "";
            VMName = "";
            VMName = vm;
            console.log(VM);

        }
    }
    else if(Environment = "lt8") {
        ResourceGroup = "gzw-" + Application + "-" + Environment + "-rgp-001";
        Locate = "West US";
        VMName = "gzw" + Application + Environment + "a" + VM;
    }

    console.log(VMName, Environment, Locate, ResourceGroup, Application);

    TriggerReleasePipe();
    form_data.reset();

}


function getMachines(){

    VM = "";
    selected = 1;
    var changeSelection = 0;

    var form_data = document.getElementById('order');

    var input1 = form_data[0];
    if (input1 !== undefined) {
        Action = input1.options[input1.selectedIndex].text;
    }

    var input2 = form_data[1];
    if (input2 !== undefined) {
        Environment = input2.options[input2.selectedIndex].text;
    }

    var input3 = form_data[2];
    if (input3 !== undefined) {
        Application = input3.options[input3.selectedIndex].text;
    }

    

    if(Application=="bilexp"){
        n=1;
    }
    else if(Application=="bdcbat"){
        n=11;
    }
    else if(Application=="bdcdfx"){
        n=5;
    }
    else if(Application=="biladc-app"){
        n=17;
        Application="biladc";
    }
    else if(Application="biladc-web"){
        n=1;
    }


    var select =[];
    select = document.querySelectorAll('.form-check-labels');
    select[0].style.display = 'block';

    var valueList = document.getElementById('valueList');
    var listArray =[];
    var x =[];
    var y =[];

    var checkboxes = document.querySelectorAll('.form-check-input');
    x = document.querySelectorAll('.vmNames');
    y = document.querySelectorAll('.form-check');

    for(i=0; i<=n; i++){
        if(i<=8){
            x[i].innerText = "gze" + Application + Environment + "a0" + [i+1];
            checkboxes[i].value = x[i].innerText;
            y[i].style.display = 'block';
        }
        else{
            x[i].innerText = "gze" + Application + Environment + "a" + [i+1];
            checkboxes[i].value = x[i].innerText;
            y[i].style.display = 'block';
        }
    }


    
    for(var checkbox of checkboxes) {

        checkbox.addEventListener('click', function(){

            if(o == 0){
                o = 1;
                listArray =[];
                valueList.innerHTML = "";
                if(this.checked == true){
                    listArray.push(this.value);
                    valueList.innerHTML = listArray.join(',');
                    VM = valueList.innerHTML;
                    console.log(valueList.innerHTML);
                }
                else{
                    //Remove value from array when it is unchecked
                    listArray = listArray.filter(e => e !== this.value);
                    valueList.innerHTML = listArray.join(',');
                    VM = valueList.innerHTML;
                    console.log(valueList.innerHTML);
    
                }
            }
            else{
                if(this.checked == true){
                    listArray.push(this.value);
                    valueList.innerHTML = listArray.join(',');
                    VM = valueList.innerHTML;
                    console.log(valueList.innerHTML);
                }
                else{
                    //Remove value from array when it is unchecked
                    listArray = listArray.filter(e => e !== this.value);
                    valueList.innerHTML = listArray.join(',');
                    VM = valueList.innerHTML;
                    console.log(valueList.innerHTML);
    
                }
    
            }
                       
            
        })
    }


}


function selectAll(){

    selected = 0;
    
    if(m == 1){
        m = 0;
        var form_data = document.getElementById('order');
        var valueList = document.getElementById('valueList');


        var input1 = form_data[0];
        if (input1 !== undefined) {
            Action = input1.options[input1.selectedIndex].text;
        }

        var input2 = form_data[1];
        if (input2 !== undefined) {
            Environment = input2.options[input2.selectedIndex].text;
        }

        var input3 = form_data[2];
        if (input3 !== undefined) {
            Application = input3.options[input3.selectedIndex].text;
        }

        if(Environment == "lt1" || "lt2" || "sb2") {
            ResourceGroup = "gze-" + Application + "-" + Environment + "-rgp-001";
            Locate = "East US";
        }
        else if(Environment = "lt8") {
            ResourceGroup = "gzw-" + Application + "-" + Environment + "-rgp-001";
            Locate = "West US";
        }

        if(Application=="bilexp"){
            n=1;
        }
        else if(Application=="bdcbat"){
            n=11;
        }
        else if(Application=="bdcdfx"){
            n=5;
        }
        else if(Application=="biladc-app"){
            n=17;
            Application="biladc";
        }
        else if(Application="biladc-web"){
            n=1;
        }

        y = document.querySelectorAll('.form-check');
        var listArray =[];
        var y =[];

        var checkboxes = document.querySelectorAll('.form-check-input');
        x = document.querySelectorAll('.vmNames');
        y = document.querySelectorAll('.form-check');

        


        let VMnames = document.getElementsByClassName("form-check-input");
        let VMnamesLength = VMnames.length;
        for(var z=0; z<=n; z++){
            VMnames[z].checked=true;
            x[z].innerText = "gze" + Application + Environment + "a0" + [z+1];
            checkboxes[z].value = x[z].innerText;
            y[z].style.display = 'block';
            listArray.push(checkboxes[z].value);
            valueList.innerHTML = listArray.join(',');
                    

        }
        VM = "";
        vm = valueList.innerHTML;
        console.log(valueList.innerHTML);
    }
    else {
        m = 1;
        o = 0;
        var form_data = document.getElementById('order');
        var valueList = document.getElementById('valueList');


        var input1 = form_data[0];
        if (input1 !== undefined) {
            Action = input1.options[input1.selectedIndex].text;
        }

        var input2 = form_data[1];
        if (input2 !== undefined) {
            Environment = input2.options[input2.selectedIndex].text;
        }

        var input3 = form_data[2];
        if (input3 !== undefined) {
            Application = input3.options[input3.selectedIndex].text;
        }

        if(Environment == "lt1" || "lt2" || "sb2") {
            ResourceGroup = "gze-" + Application + "-" + Environment + "-rgp-001";
            Locate = "East US";
        }
        else if(Environment = "lt8") {
            ResourceGroup = "gzw-" + Application + "-" + Environment + "-rgp-001";
            Locate = "West US";
        }

        if(Application=="bilexp"){
            n=1;
        }
        else if(Application=="bdcbat"){
            n=11;
        }
        else if(Application=="bdcdfx"){
            n=5;
        }
        else if(Application=="biladc-app"){
            n=17;
            Application="biladc";
        }
        else if(Application="biladc-web"){
            n=1;
        }

        y = document.querySelectorAll('.form-check');
        var listArray =[];
        var y =[];

        var checkboxes = document.querySelectorAll('.form-check-input');
        x = document.querySelectorAll('.vmNames');
        y = document.querySelectorAll('.form-check');

        


        let VMnames = document.getElementsByClassName("form-check-input");
        let VMnamesLength = VMnames.length;
        for(var z=0; z<=n; z++){
            VMnames[z].checked=false;
            x[z].innerText = "gze" + Application + Environment + "a0" + [z+1];
            checkboxes[z].value = x[z].innerText;
            y[z].style.display = 'block';
            valueList.innerHTML = [];
                    

        }

        vm = "";
        VM = "";
        console.log(valueList.innerHTML);
    }


    
}









    