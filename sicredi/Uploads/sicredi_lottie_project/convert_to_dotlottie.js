
// Este script pode ser executado quando a biblioteca @dotlottie/js estiver disponível
const { DotLottie } = require('@dotlottie/js');
const fs = require('fs');
const path = require('path');

async function convertToDotLottie() {
  const jsonPath = path.join(__dirname, 'sicredi_movement.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const dotlottie = await (new DotLottie()
    .addAnimation({
      id: 'sicredi_movement',
      data: jsonData,
      loop: true,
      autoplay: true
    })
    .build());
  
  await dotlottie.download(path.join(__dirname, '..', 'sicredi_movement.lottie'));
  console.log('Arquivo dotLottie criado com sucesso!');
}

convertToDotLottie().catch(console.error);
  