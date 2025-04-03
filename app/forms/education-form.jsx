import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EducationForm({ form }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">University/College</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="uniName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Institute</FormLabel>
                <FormControl>
                  <Input placeholder="Enter institute name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uniAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address of Institute</FormLabel>
                <FormControl>
                  <Input placeholder="Enter institute address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uniFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From (DD-MM-YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uniTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (DD-MM-YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uniGrades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grades</FormLabel>
                <FormControl>
                  <Input placeholder="Enter grades" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">College/School</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Institute</FormLabel>
                <FormControl>
                  <Input placeholder="Enter institute name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address of Institute</FormLabel>
                <FormControl>
                  <Input placeholder="Enter institute address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegeFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From (DD-MM-YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegeTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (DD-MM-YYYY)</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegeGrades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grades</FormLabel>
                <FormControl>
                  <Input placeholder="Enter grades" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Email Reference</h3>
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="emailDate1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date 1</FormLabel>
                <FormControl>
                  <Input placeholder="Wednesday, 22/01/2025 15:29" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailReply1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Reply</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter email reply"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailDate2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date 2</FormLabel>
                <FormControl>
                  <Input placeholder="Mon 09/12/2024 11:11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailRe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RE:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="niNumber_"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NI Number:</FormLabel>
                <FormControl>
                  <Input className="w-1/4" placeholder="Ni Number " {...field} />
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
