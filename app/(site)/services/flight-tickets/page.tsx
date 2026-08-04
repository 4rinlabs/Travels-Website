import { Metadata } from "next";
import FlightTicketsClient from "./FlightTicketsClient";

export const metadata: Metadata = {
  title: "Flight Tickets | EazyFly Travels",
  description: "Book affordable flight tickets to destinations worldwide with EazyFly Travels.",
};

export default function FlightTicketsPage() {
  return <FlightTicketsClient />;
}