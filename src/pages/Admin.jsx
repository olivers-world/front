/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Admin = () => {
  return (
    <div className="flex h-screen w-screen bg-white after:w-screen after:h-screen">
      <div className="flex bg-slate-50 w-1/6 h-screen">
        <Accordion type="single" collapsible className="w-full m-3 flex-col gap-10">
          <AccordionItem value="item-1" className="flex justify-center">
            <Button variant="outline" className="self-center w-72">
              Utilisateurs
            </Button>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <Button variant="outline" className="self-center w-72">
            Utilisateurs
          </Button>
          <Button variant="outline" className="self-center w-72">
            Utilisateurs
          </Button>
          <Button variant="outline" className="self-center w-72">
            Utilisateurs
          </Button>
          <Button variant="outline" className="self-center w-72">
            Utilisateurs
          </Button>
        </Accordion>
      </div>

      <div className="m-3">CHANGER FENETRE DYNAMIQUEMENT ICI</div>
    </div>
  );
};

export default Admin;
