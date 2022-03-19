import { EventEmitter } from 'events';

function ticker(myNumber, callback){
  const emitter=new EventEmitter();
  let index=0;

  const timeout= setTimeout(()=>{
    emitter.emit('tick', index); 
    if(index*50<myNumber){
      index++;
      timeout.refresh();
    }else {
      callback(index);
    }
  },50);
  return emitter;
}

const emitter=ticker(1000, (totalTicks)=>{
  console.log(' total ticks => '+ totalTicks);
})
emitter.on('tick',(index)=>console.log(' tick number =>  '+ index));