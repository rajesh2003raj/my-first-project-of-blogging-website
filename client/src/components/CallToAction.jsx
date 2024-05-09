import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center outline-none'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl font-serif'>
            Here, we have the opportunity to delve deeper into technical expertise and glean insights from my personal journey, encompassing both specialized knowledge and broader experiences.
            </h2>
            
           
            
        </div>
        <div className="p-7 flex-1">
            <img src="https://th.bing.com/th/id/OIP.OlilRMMjyjCRGtmJmgUZ5wAAAA?rs=1&pid=ImgDetMain" />
        </div>
    </div>
  )
}