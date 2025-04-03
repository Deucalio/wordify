import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function PersonalInfoForm({ form }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth (DD-MM-YYYY)</FormLabel>
              <FormControl>
                <Input placeholder="DD-MM-YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionAppliedFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Applied For</FormLabel>
              <FormControl>
                <Input placeholder="Enter position applied for" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proofOfAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proof of Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter proof of address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shirtsSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shirts Size</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shirts size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trouserSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trouser Size</FormLabel>
              <FormControl>
                <Input placeholder="Enter your trouser size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="Enter your mobile number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfEntryToUK"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Entry to UK (DD-MM-YYYY)</FormLabel>
              <FormControl>
                <Input placeholder="DD-MM-YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="placeOfEntryToUK"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place of Entry to UK</FormLabel>
              <FormControl>
                <Input placeholder="Enter place of entry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="workPermit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Permit</FormLabel>
              <FormControl>
                <Input placeholder="Enter work permit details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National Insurance Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your NI number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your passport number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siaLicenseSector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIA License Sector</FormLabel>
              <FormControl>
                <Input placeholder="Enter SIA license sector" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siaLicenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIA License Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter SIA license number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

