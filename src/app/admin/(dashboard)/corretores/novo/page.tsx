import { BrokerForm } from "../broker-form";

export default function NewBrokerPage() {
  return (
    <section className="max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Cadastrar corretor</h2>
      <BrokerForm />
    </section>
  );
}
