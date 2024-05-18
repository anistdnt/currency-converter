const dropdowns = document.querySelectorAll(".drop-down select");
const ansBtn=document.querySelector(".ans-btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const output= document.querySelector(".msg");

// including all country codes
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="INR"){
            newOption.selected="selected";//setting 'from' as INR
        } else if(select.name==="to" && currCode==="USD"){
            newOption.selected="selected";//setting 'to' as USD
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);//passing the element where the event occured
    });
}

function updateFlag(element){
    let currCode=element.value;
    let contryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${contryCode}/shiny/64.png`
    let parent=element.parentElement;
    let img=parent.parentElement.querySelector("img");
    img.src=newSrc;
}

ansBtn.addEventListener("click", async(event)=>{
    event.preventDefault();//prevents the default work after form submission
    let input = document.querySelector(".input-amount input");
    let amtVal=input.value;
    if(amtVal==="" || amtVal<1){// for default loading
        amtVal=1;
        input.value=1;
    }
    const url=`https://v6.exchangerate-api.com/v6/d2e4e2b8dd922d1d45907979/latest/${fromCurr.value}`;
    let response=await fetch(url);
    let data= await response.json();
    let exchangeRate=data.conversion_rates[toCurr.value];
    let finalOutput=amtVal*exchangeRate;
    output.innerText=`${amtVal} ${fromCurr.value} = ${finalOutput} ${toCurr.value}`
});