import React from 'react';
import style from '../modulCss/About.module.css';

const About = () => {
  return (
    <div className={style.aboutBody}>
      <section className={`text-gray-200 ${style.aboutSection}`}>
        <div className="container mx-auto px-0">
          <div className="flex flex-nowrap relative">
            <div className={`hidden md:flex ${style.leftHeader}`}>
              <div className="items-end uppercase">
                <h2 className="mb-0">About Me</h2>
              </div>
            </div>
            <div className="">
              <div className={`${style.mainContent} p-5`}>
                <div className={`${style.mainHeader} mb-4`}>
                  <h6 className={`${style.subHeading} uppercase block mb-2`}>Who I am</h6>
                  <h1 className="main-heading inline-block uppercase pb-3 border-b-2">&lt; About &gt;</h1>
                </div>

                <div className="flex mb-5">
                  <div className="md:mb-5 mb-4 p-2 w-1/2">
                    <img className='' src="https://source.unsplash.com/35sVnCCynWA/784x1250" alt="Colorful Wall" />
                  </div>
                  <div className="w-full md:w-2/3 md:pl-4">
                    <div className="mb-5 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">I'm Rodrigues</h3>
                      <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nulla
                        rerum doloribus qui, neque placeat veniam est deserunt eum aperiam quia, ab
                        fuga sed? Commodi laboriosam nulla hic amet sint.</p>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="mb-4 md:mb-0 md:pr-4 w-full sm:w-1/2">
                        <div className="flex items-center">
                          <i className="fab fa-js-square icon-18 mr-3"></i>
                          <div>
                            <h4 className="m-0">Javascript</h4>
                            <p className="m-0">Quasea minus animi sequi sit nostrum? Lorem ipsum
                              dolor sit amet
                              consectetur adipisicing elit.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 md:mb-0 md:pl-4 w-full sm:w-1/2">
                        <div className="flex items-center">
                          <i className="fab fa-react icon-18 mr-3"></i>
                          <div>
                            <h4 className="m-0">React</h4>
                            <p className="m-0">Ducimus facere vitae sapiente ab sit. Lorem ipsum
                              dolor sit amet
                              consectetur adipisicing elit.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 md:mb-0 md:pr-4 w-full sm:w-1/2">
                        <div className="flex items-center">
                          <i className="fab ri-css3-line icon-18 mr-2"></i>
                          <div>
                            <h4 className="m-0">Css</h4>
                            <p className="m-0">Eaque voluptatibus dolores. Quod. Lorem dolor sit
                              amet
                              consectetur. Minus, asperiores.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-0 md:pl-4 w-full sm:w-1/2">
                        <div className="flex items-center">
                          <i className="fab fa-node-js icon-18 mr-3"></i>
                          <div>
                            <h4 className="m-0">Node.js</h4>
                            <p className="m-0">Numquam saepe deserunt obcaecati? Doloribus. Lorem
                              ipsum dolor
                              sit amet adipisicing elit.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="about-data">
                  <div className="flex flex-wrap pt-5 border-t">
                    <div className="mb-4 md:mb-0 pr-4 md:w-1/2 lg:w-1/4">
                      <div className="flex items-center">
                        <i className="fas fa-mug-hot icon-18 mr-2"></i>
                        <div>
                          <p className="data-number m-0 font-bold">10,950</p>
                          <p className="m-0 text-uppercase">Cups of coffee</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 md:mb-0 pl-4 md:w-1/2 lg:w-1/4">
                      <div className="flex items-center">
                        <i className="fas fa-code icon-18 mr-2"></i>
                        <div>
                          <p className="data-number m-0 font-bold">8,475,000</p>
                          <p className="m-0 text-uppercase">Lines of code</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 md:mb-0 pr-4 md:w-1/2 lg:w-1/4">
                      <div className="flex items-center">
                        <i className="fas fa-bus icon-18 mr-2"></i>
                        <div>
                          <p className="data-number m-0 font-bold">8,214</p>
                          <p className="m-0 text-uppercase">Buses taken</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 md:mb-0 pl-4 md:w-1/2 lg:w-1/4">
                      <div className="flex items-center">
                        <i className="far fa-smile-wink icon-18 mr-2"></i>
                        <div>
                          <p className="data-number m-0 font-bold">3,165</p>
                          <p className="m-0 text-uppercase">Awkward winks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
