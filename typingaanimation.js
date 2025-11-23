class typing_text{
        bool_blink=false;
        constructor(id,on_cursur=true) {
            this.id=id;
            this.on_cursur=on_cursur;
            this.items=document.getElementById(this.id);
            if(this.items){
                // 올바른 호출
                 
                this.items.style.width='fit-content';
            }
        }
        blink(){
            if(this.items&&this.bool_blink){
                if(this.items.style.borderRight=='2px solid black'){
                    this.items.style.borderRight= '2px solid #ffffff00';
                }else{
                    this.items.style.borderRight= '2px solid black';
                }
            }
            
        }
        SplitHangul(input){
            
            let unl_code=input.charCodeAt(0) - 0xAC00;
            let code=input.charCodeAt(0);
            let true_false = (code >= 0xAC00 && code <= 0xD7A3)   // 완성형
            || (code >= 0x1100 && code <= 0x11FF)  // Jamo
            || (code >= 0x3130 && code <= 0x318F); // 호환 자모
            if(!true_false){
                return {
                    분리체:null,
                    완성체:input
                }
            }else{
                
                let results= String.fromCharCode(0xAC00 + Math.floor(unl_code/588)*588 + Math.floor((unl_code%588)/28)*28);
                return {
                    분리체:results,
                    완성체:input
                }
            }
        }
        /** 지연시간은 60~65이 가장 자연스럽습니다.**/
        typings(타이핑할_글자,지연시간ms){
            return new Promise((resolve,reeject)=>{
                this.bool_blink=false;
                setInterval(() => this.blink(), 500);
                this.items.style.borderRight= '2px solid black';
                // console.log("테스트");
                let now_string=" ";
                let delays=지연시간ms;
                if(this.items){
                
                for(let i=0;i<타이핑할_글자.length;i++){
                    let now_array=this.SplitHangul(타이핑할_글자[i]);
                    if(now_array.분리체==null){
                        setTimeout(() => {
                            now_string+=now_array.완성체
                            this.items.innerText=now_string;
                         }, delays);
                        delays+=지연시간ms;
                        continue;
                    }

                    setTimeout(() => {
                        this.items.innerText=now_string+now_array.분리체;
                    }, delays);
                    delays+=지연시간ms;
                    setTimeout(() => {
                        now_string+=now_array.완성체;
                        this.items.innerText=now_string;
                    }, delays);
                    delays+=지연시간ms;
                    
                    
                }
                
                }
                 setTimeout(() => {
                    this.bool_blink=true;
                }, delays);
                setTimeout(() => {
                
                    resolve(); // 이제 resolve를 찾을 수 있습니다.
                }, delays+20000);
            });
        }
        /** 지연시간은 50~55ms 가 가장 자연스럽습니다.**/
        backtypings(지연시간ms){
            return new Promise((resolve,reject)=>{
                this.bool_blink=false;
                setInterval(() => this.blink(), 500);;
                if(this.items){
                    let delays=지연시간ms;
                    let now_string=this.items.innerText;
                    for(let i=now_string.length-1;i>0;i--){
                        setTimeout(() => {
                            now_string = now_string.substring(0,i-1);
                            this.items.innerText=now_string;
                        }, delays);
                        delays+=지연시간ms;
                    }
            
                }
                setTimeout(() => {
                    this.bool_blink=true;
                }, delays);
                setTimeout(() => {
                    resolve();
                }, delays+20000);
                
            })
            
        }
    }
