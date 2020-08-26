import Appointment from '../models/Appoitment';

class AppointmentsRepository {

  private appointements: Appointment[];

  constructor(){
    this.appointements = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointements.push(appointment);

    return appointment;
  }
}
export default AppointmentsRepository;
