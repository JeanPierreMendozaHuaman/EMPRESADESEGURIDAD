
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    rugaapi,
    GroupSettingChange
} = require('@adiwajshing/baileys')
/******COMIENZO DE LA ENTRADA DEL ARCHIVO******/
const { color, bgcolor } = require('./lib/color')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, pegatinas, musica, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const axios = require("axios")
const fetch = require('node-fetch')
/*const tiktod = require('tiktok-scraper')*/
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const speed = require('performance-now')
/******COMIENZO DE LA ENTRADA JSON******/
const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))
/******FIN DE ENTRADA JSON******/
/******CARGA DE ENTRADA VCARD******/
const vcard = 'BEGIN:VCARD\n' // Tarjeta de contacto
            + 'VERSION:3.0\n' 
            + 'FN:Shan\n' // Nombre
            + 'ORG:Shanduy;\n' // Propietario
            + 'TEL;type=CELL;type=VOICE;waid=593967689722:+593 96 768 9722\n' // ID de WhatsApp + número de teléfono
            + 'END:VCARD'
/******FIN DE ENTRADA VCARD******/

prefix = ' '
blocked = []
banChats = false

/******CONFIGURACION DE CARGA******/
const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	author,
	pack
} = settingan
/******FIN DE ARCHIVOS ANTILINK POR BOTRONALDO******/
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const antiface = JSON.parse(fs.readFileSync('./src/antiface.json'))
const antitik = JSON.parse(fs.readFileSync('./src/antitik.json'))
const antinsta = JSON.parse(fs.readFileSync('./src/antinsta.json'))
const antikwai = JSON.parse(fs.readFileSync('./src/antikwai.json'))
const antidiscord = JSON.parse(fs.readFileSync('./src/antidiscord.json'))
		
function addMetadata(packname, author) {	
	if (!packname) packname = 'ronaldobot'; if (!author) author = 'ronaldobot';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(2000);
    console.log(i);
  }
}



	
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.version = [2, 2126, 14]
        client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea el codigo QR rapido!!!  '))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'Desconectado')
	})
	client.on('open', () => {
		success('2', 'Conectado ronaldobot')
	})


await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				num = anu.participants[0]
				teks = ` @${num.split('@')[0]} 👋 😎`
				client.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	



client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const apikey = setting.apikey
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Guayaquil').format('HH:mm:ss')
			const date = moment.tz('America/Guayaquil').format('DD/MM/YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined
			const isCmd = body.startsWith(prefix)

			mess = {
			
				success: '✔️ Listo ✔️',
                                
				
only: {
					
					daftarB: `conectado`,
				}
			}
				
 const apakah = ['Si','No']
                
			const botNumber = client.user.jid
			const ownerNumber = ["5198891725@s.whatsapp.net"] // replace this with your number
			const nomorOwner = [ownerNumber]
	                const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const isBanned = ban.includes(sender)
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
                        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
                        const isUser = user.includes(sender)
                        const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
                        const NomerOwner = '51988891725@s.whatsapp.net'
                        const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
                        const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
			
			
		const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
				
	
//FIN ANTILINKS FACEBOOK GRUPOS PERFILES PUBLICACIONES			
			
//FUNCION ANTILINK
	

			switch(command) {
		
					
		/*case 'visxs':
	       case 'trest':
               client.sendMessage(from, virtex(prefix, sender), text, {quoted: mek})
               break*/
			
                            
                default:
                
		if (budy.includes(``)) {
	          sleep(2000);
                  reply(`Hola! 😀 Nos alegra que estés interesado en nuestros cursos de Formación de Agentes de Seguridad. Soy tu asistente virtual *MypeBot* solo escribe 
		  uno de los números siguientes y te responderé automáticamente. 
		  *(1): Precio*
		  *(2): Fecha de inicio y horario*
		  *(3): Requisitos*
		  *(4): Beneficios y Ventajas*
		  *(5): ¿Por qué elegirnos?*
		  *(6): Temario de las clases*
		  *(7): Número celular de la Asesora*
		  *(8): Examenes*
		  *(9): Quiero realizar el pago ya* \n\
		  WEB: https://jlseguridad.com/curso-sucamec/
		  `);
                  }
					
				
		if (budy.includes(`1`)) {
                  reply(
			  `*-----------Precio-----------*\n\ 
 *Curso Básico* :El precio es de S/135 soles \n\
 *Curso Perfeccionamiento*: El precio es de S/120 soles \n\
 En ambos casos incluye el certificado digital al culminar los estudios`);
			demo();
			
                  }

		if (budy.includes(`2`)) {
                  reply(`*---Fecha de Inicio y Horario---*\n\
las clases comienzan este *20 de setiembre* \n\
El curso básico tiene una duración de 12 dias, de 8:00AM-11:45AM\n\
El curso perfeccionamiento tiene una duración de 7 dias, de 02:00PM-03:45PM\n\
las clases sonn de *lunes a sábado* por las plataforma ZOOM.
Existirá una *capacitación previa* para enseñarte a usar Zoom y la plataforma educativa.

		  `);
			demo();
			
                  }

		if (budy.includes(`3`)) {
                  reply(`*----Requisitos para la clase----*\n\
Contar con un dispositivo con acceso a internet ejemplo: celular, Tablet, laptop, computadora. \n\ En caso usara una computadora, esta debe tener una cámara y audífono externos. \n\ 
En caso use celular, Tablet o laptop estas tienen cámara, micrófono y audífono incorporados. Por lo que no deberá preocupase en comprar más. \n\ Tener mayoría de edad (mínimo 18 años)	
		  `);
			demo();
			
                  }

		if (budy.includes(`4`)) {
                  reply(`*-----BENEFICIOS Y VENTAJAS-----*\n\
Acceso a una plataforma educativa virtual con capacitaciones previas para garantizar que usted tenga el dominio total de esta herramienta.Las clases serán grabadas y subidas a la plataforma web.
Contará con un usuario y contraseña personal para realizar los exámenes.Tendrá mayor preferencia en la hora de postular para alguno de las infraestructuras a la cual prestamos servicios.
Una vez culmine el curso de manera satisfactoria, estará inscrito en el sistema de la SUCAMEC, por lo que cualquier empresa de seguridad del Perú podrá verificar que usted está capacitado para ser Agente de 	Seguridad. 
Una vez obtenga este certificado podrá continuar con los siguientes trámites para la obtención de licencia de arma. Ya que este curso es obligatorio para cualquier agente que desee obtener licencia de arma. 

		  
		  `)
			
                  }
					
		if (budy.includes(`5`)) {
                  reply(`*----JL SEGURIDAD----*\n\
La empresa tiene más 20 años de fundacion en la cual hemos brindado clases virtuales a 850 personas de  las cuales el 95% de ellos ya tienen trabajo como Agente de Seguridad.
Esto gracias al prestigio y experiencia que tiene la empresa. 
		  
		  `)
			
                  }
                 
		if (budy.includes(`6`)) {
                  reply(`*-------TEMARIO DE LAS CLASES------*\n\
Constitución y Derechos Humanos\n\
Ética y Seguridad Privada\n\
Legislación y Seguridad Privada\n\
Redacción y elaboración de Documentos\n\
Normas y procedimientos de Seguridad\n\
Control de Emergencias y Seguridad de Instalaciones\n\
Atención al Cliente e identificación de Personas\n\
Defensa Personal\n\
Conocimiento de Sistemas de Alarmas\n\
Primeros Auxilios\n\
Conocimiento y manipulación de Armas\n\
		  
		  
		  `)
			
                  }
		
					
		if (budy.includes(`7`)) {
                  reply(`*--NÚMERO CELULAR DE LA ASESORA--*\n\
El numero de *atención(llamadas)* es 956988585  (Srta. Raquel)
Horario de llamadas: 9:00AM - 6:00PM
		  
		  
		  
		  `)
			
                  }
					
					
		
		if (budy.includes(`8`)) {
                  reply(`*----EXÁMENES----*\n\
Despues de culminar cada tema del *Temario de Clases* se rendirá un examen. Las pruebas serán relativamente fáciles ya que el instructor 20 minutos antes
realizará un repaso general de cada tema para garantizar que el alumno pueda aprobar. Además las clases son grabadas y se subiran en la plataforma web con el
fin de que el alumno pueda repasar o revisar algún tema. Por otro lado, en caso se presente alguna dificultad para realizar el examen, se tomará hasta 02 examenes de recuperación
		  
		  
		  `)
			
                  }
					
		
		if (budy.includes(`9`)) {
                  reply(`*CUENTAS BANCARIAS*
Numero de cuenta para realizar el pago:
 
https://drive.google.com/file/d/1jjv6SKzhjFcfkcuLk4G3o5tzVIrS99f0/view
Despues de haber realizado el pago enviar el voucher al  siguiente número http://Wa.me/+51956988585
(956988585) le pedirá una foto de su dni para poder registrarle en el sistema.
		  `)
			
                  }			
					
	
				if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
