import React from "react";
import { Vortex } from "../ui/vortex";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface VortexDemoProps {
    children?: React.ReactNode;
    backgroundColor: string;
    rangeY: number;
    particleCount: number;
    baseHue: number;
    className: string;
}

export const VortexDemo: React.FC<VortexDemoProps> = ({ backgroundColor, rangeY, particleCount, baseHue, className }) => {
  return (
    <div className="w-full mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={400}
        baseHue={240}
        rangeSpeed={0.2}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="w-full px-4 relative z-20">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white ">
                Un Simulateur de Prêt
                <br />
                <span className="block mt-4">
                <motion.span
                initial={{
                    backgroundSize: "0% 100%",
                }}
                animate={{
                    backgroundSize: "100% 100%",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 0.5,
                }}
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    display: "inline",
                }}
                className={cn(
                        `relative inline-block pb-2 px-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600`,
                    className
                )}
                >
                    tellement bon que ça paraît irréel
                </motion.span>
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed bg-transparent mt-4">
                Simulez votre prêt, vos revenus locatifs et votre capacité d'achat en un seul endroit.
                Prenez des décisions éclairées pour votre investissement immobilier.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                    text-white font-medium px-6 py-2.5 text-sm rounded-lg transition-all duration-300 
                    transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 "
                  asChild
                >
                  <Link to="#simulate">Commencer la Simulation</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 
                    px-6 py-2.5 text-sm rounded-lg transition-all duration-300"
                  asChild
                >
                  <Link to="#features">En Savoir Plus</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
}


