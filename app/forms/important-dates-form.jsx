import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ImportantDatesForm({ form }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="interviewDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date in Interview, Application, Competence Form
              </FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephoneScreeningDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date in Telephone Screening for Job 1</FormLabel>
              <FormControl>
                <Input placeholder="Thursday 23/01/2025 13:22" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephoneScreeningDateTwo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date in Telephone Screening for Job 2</FormLabel>
              <FormControl>
                <Input placeholder="Thursday 23/01/2025 13:28" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentContractDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date in Employment Contract, Induction Training, Uniform Issue
                Record, WTR 48 Forms{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screeningProgressDate1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date for 1st Signature in Screening Progress
              </FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screeningProgressDate2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date for 2nd Signature in Screening Progress
              </FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screeningPeriodFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12/16 Screening Period From</FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screeningPeriodTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12/16 Screening Period To</FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="environmentalTrainingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date in Environmental Training, and Medical Questionnaire
              </FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
