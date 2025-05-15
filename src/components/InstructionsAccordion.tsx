
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InstructionsAccordion = () => {
  const exampleQuestions = [
    "Show me revenue by region",
    "How has our revenue trended over time?",
    "What's the distribution of customers by region?",
    "What's our revenue per customer by region?",
    "Show me growth analysis from January to May"
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>About this AI Data Agent</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            This AI Data Agent can analyze business data from a SQL database and provide insights through natural language
            responses, charts, and tables. It can handle complex analytical questions about revenue, customers, growth trends,
            and more.
          </p>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Example Questions</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {exampleQuestions.map((question, index) => (
              <div key={index} className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
                "{question}"
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Solution Architecture</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground mb-2">
            This application uses:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>React for the frontend UI</li>
            <li>Tailwind CSS and ShadCN UI for styling</li>
            <li>Recharts for data visualization</li>
            <li>Mock API service (simulating Node.js backend)</li>
            <li>Pattern matching for query analysis</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InstructionsAccordion;
