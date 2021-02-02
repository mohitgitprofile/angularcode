export class GlobalConstant {
    public static paginationLimit =  2;
    public static statusArr: any[] = [
        { name: 'Setting up', value: 'settingUp' },
        { name: 'Published', value: 'published' },
        { name: 'In Progress', value: 'inProgress' },
        { name: 'Completed', value: 'completed' },
        { name: 'Cancelled', value: 'cancelled' }
    ];
    public static teamStatusArr: any[] = [
        { name: 'Confirmed', value: 'confirmed' },
        { name: 'Unconfirmed', value: 'unconfirmed' }
    ];
    public static multidropDownSettings =  {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
    };
    public static limitChangeArr = ['2', '10', '25', '50', '100']
    public static sportsTypeArr = [
        { name: 'Single', value: 'single' },
        { name: 'Double', value: 'double' },
        { name: 'Team', value: 'team' }
    ]
    public static genderArr = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' }
    ]

    public static sportsNameArr = [
        { name: 'Basketball', value: 'Basketball' },
        { name: 'Badminton', value: 'Badminton' },
        { name: 'Generic', value: 'Generic' },
        { name: 'Cricket', value: 'Cricket' },
        { name: 'Swimming', value: 'Swimming' },
        { name: 'Volleyball', value: 'Volleyball' },
        { name: 'Table Tennis', value: 'Table Tennis' },
        { name: 'Soccer', value: 'Soccer' }
    ]

    public static subscriptionArr = [
        { name: 'One Event', value: 'oneEvent' },
        { name: 'Yearly', value: 'yearly' },
        { name: 'Monthly', value: 'monthly' }
    ]
    public static paymentCredential = {
        sellerId: "901386003",
        publishableKey: "4769A4CA-5488-4585-B1DF-B8AB85753020"
    }
    public static productTypeArr = [
        { name: 'T-Shirt', value: 'Tshirt' },
        { name: 'Trouser', value: 'Trouser' },
        { name: 'Medal', value: 'Medal' }
    ]
    
}