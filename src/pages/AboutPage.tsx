import React from 'react';
import { Heart, Recycle, Award, Users } from 'lucide-react';

const AboutPage: React.FC = () => (
  <div>
    <section className="bg-primary-50 py-16 text-center">
      <h1 className="text-4xl font-bold text-primary-900 mb-4">Про нас</h1>
      <p className="text-primary-700 max-w-2xl mx-auto">Кожна вінтажна річ має свою історію</p>
    </section>

    <section className="py-16 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Наша історія</h2>
          <p className="text-gray-600 mb-4">
            Vintage Clothing Platform — це спільнота любителів вінтажної моди, 
            об'єднаних прагненням знаходити унікальні речі з минулого.
          </p>
          <p className="text-gray-600">
            Ми ретельно перевіряємо кожну річ, щоб ви могли бути впевнені у своєму виборі.
          </p>
        </div>
        <div className="bg-primary-100 rounded-2xl p-8 aspect-square flex items-center justify-center text-8xl">
          👗
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наші цінності</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Heart, title: 'Любов до деталей' },
            { icon: Recycle, title: 'Сталий розвиток' },
            { icon: Award, title: 'Якість' },
            { icon: Users, title: 'Спільнота' },
          ].map(({ icon: Icon, title }) => (
            <div key={title} className="text-center">
              <div className="w-16 h-16 bg-vintage-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-vintage-brown" />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;