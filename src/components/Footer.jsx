export function Footer () {
  return (
    <footer className='flex justify-end items-end h-72 mt-24'>
      <section className='relative w-full min-h-[100px] bg-[#1c1c1c] flex justify-center items-center flex-col'>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/agendatur.svg")] bg-[length:2000px_140px] h-[100px] z-[1500] opacity-100 bottom-0 animate-[animateBus_5s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/campo.png")] bg-[length:1000px_100px] h-[100px] z-[999] opacity-50 bottom-2.5 animate-[animateWave_6s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/montizq.png")] bg-[length:1000px_100px] h-[100px] z-[1000] opacity-30 bottom-3.5 animate-[animateWave02_5s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/montder.png")] bg-[length:1000px_100px] h-[100px] z-[999] opacity-70 bottom-1.25rem animate-[animateWave02_7s_linear_infinite]'> </div>
        <p className='text-center text-white mt-1.5 max-w-3xl'>Agenda Turistica. Planifica tu proximo evento.</p>
        <p className='text-center text-white mt-1.5'>Contáctanos:<br />
          Cdad. de Cali 320, B8003FTF<br />
          Bahía Blanca, Provincia de Buenos Aires<br />
          Tel: (0291) 4592550 - Fax: (0291) 4592551<br />
          Correo electrónico: info@agendaturistica.com.ar
        </p>
        <p className='text-white'>@agendaturistica 2024</p>
      </section>
    </footer>
  )
}
