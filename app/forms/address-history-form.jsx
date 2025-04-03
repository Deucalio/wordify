import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function AddressHistoryForm({ form }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your permanent address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permanentPostCode"
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
            name="permanentFrom"
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
            name="permanentTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (DD-MM-YYYY or Till Now)</FormLabel>
                <FormControl>
                  <Input placeholder="DD-MM-YYYY or Till Now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Previous Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="previousAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your previous address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousPostCode"
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
            name="previousFrom"
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
            name="previousTo"
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
        </div>
      </div>
    </div>
  )
}

