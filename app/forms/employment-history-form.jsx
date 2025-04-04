import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EmploymentHistoryForm({ form }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Job 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="job1CompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Name</FormLabel>
                <FormControl>
                  <Input placeholder="TOTAL SECURITY SERVICES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1Address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter employer address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1PostCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1Tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter telephone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1Position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Enter position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1Manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <FormControl>
                  <Input placeholder="Enter manager name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1From"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From (DD/MM/YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1To"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (DD/MM/YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="fire1@piazzaitaliastore.it" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*  */}

          <FormField
            control={form.control}
            name="job1EmailReplyDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Reply Date</FormLabel>
                <FormControl>
                  <Input placeholder="Tuesday, 11/03/2025 14:31" {...field} />
                </FormControl>
                <FormDescription>
                  This is the date for Email screening file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1EmailReply"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Email Reply</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dear Sir, Thank you for reaching out regarding ADEEL ALI reference. Adeel Ali joined our team on 10 April 2024 and worked diligently"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job1ReasonForLeaving"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Reason for Leaving</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter reason for leaving" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Job 2</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="job2CompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Name</FormLabel>
                <FormControl>
                  <Input placeholder="NOOR WEAVING MILL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2Address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter employer address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2PostCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2Tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter telephone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2Position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Enter position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2Manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <FormControl>
                  <Input placeholder="Enter manager name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2From"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From (DD/MM/YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2To"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (DD/MM/YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="job2@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2EmailReplyDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Reply Date</FormLabel>
                <FormControl>
                  <Input placeholder="Monday, 10/03/2025 14:26" {...field} />
                </FormControl>
                <FormDescription>
                  This is the date for Email screening file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2EmailReply"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Email Reply</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dear Sir, Thank you for reaching out regarding ADEEL ALI reference. Adeel Ali joined our team on 10 April 2024 and worked diligently"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job2ReasonForLeaving"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Reason for Leaving</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter reason for leaving" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
