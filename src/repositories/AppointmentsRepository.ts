import { isEqual } from 'date-fns';
import Appointment from '../models/Appoitment';

interface CreateAppointmentDTO{
  provider: string;
  date: Date;
}
class AppointmentsRepository {

  private appointements: Appointment[];

  constructor(){
    this.appointements = [];
  }
  public all(): Appointment[]{
    return this.appointements;
  }

  public findByDate(date: Date): Appointment | null{
    const findAppointment = this.appointements.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;

  }

  public create({ provider, date}: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({provider, date});
    this.appointements.push(appointment);

    return appointment;
  }
}
export default AppointmentsRepository;
