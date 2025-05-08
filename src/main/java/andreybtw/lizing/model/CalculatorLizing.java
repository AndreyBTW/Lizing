package andreybtw.lizing.model;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorLizing {


    private Long id;

    private double sum;

    private double PV;

    private double month;


    public long getMonthlyPayment() {
        return (long) ((((sum - PV) * 0.16 / 12 * Math.pow((1 + 0.16 / 12), month)))
                / (Math.pow(1 + 0.16 / 12, month) - 1));
    }

    public long getTotalPayment() {
        return (long) (PV + (getMonthlyPayment() * month));
    }

    public long getSaveNDS() {
        return (long) (getTotalPayment() * 0.4);
    }

    public long getSumWithSaveNDS() {
        return getTotalPayment() - getSaveNDS();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CalculatorLizing that = (CalculatorLizing) o;
        return Double.compare(sum, that.sum) == 0 && Double.compare(PV, that.PV) == 0 &&
                Double.compare(month, that.month) == 0 && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sum, PV, month);
    }
}
