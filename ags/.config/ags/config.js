// Services
const hyprland = await Service.import("hyprland")

/***************/
// Polling functions
/***************/
const time = Variable('', {
    poll: [1000, function() {
        let now = new Date()
        let options = {
            hourCycle: 'h23',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
        let formattedDate = now.toLocaleDateString("en-ca", options)
        return formattedDate
    }],
})


/************/
// WIDGETS
/************/

const Workspaces = () => {
    const activeId = hyprland.active.workspace.bind("id")
    const workspaces = hyprland.bind("workspaces")
        .as(workspace => workspace.map( ({ id }) => Widget.Button({
            on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
            child: Widget.Label(`${id}`),
            className: activeId.as ( i => `${i === id ? "focused" : ""}` ),
        })))

    return Widget.Box({
        className: "workspaces",
        children: workspaces,
    })
}

const Clock = () => {
    return Widget.Label({
        className: "clock",
        label: time.bind(),
    })
}



////const NotificationsWidget = () => Widget.Box({
////    className: 'notification',
////    children: [
////        Widget.Icon({
////            icon: 'preferences-system-notifications-symbolic',
////            connections: [
////                [Notifications, self => self.visible = Notifications.popups.length > 0],
////            ],
////        }),
////        Widget.Label({
////            connections: [[Notifications, self => {
////                self.label = Notifications.popups[0]?.summary || '';
////            }]],
////        }),
////    ],
////});
//
//const VolumeWidget = () => Widget.Box({
//    className: 'volume',
//    style: 'min-width: 180px',
//    children: [
//        Widget.Stack({
//            items: [
//                // tuples of [string, Widget]
//                ['101', Widget.Icon('audio-volume-overamplified-symbolic')],
//                ['67', Widget.Icon('audio-volume-high-symbolic')],
//                ['34', Widget.Icon('audio-volume-medium-symbolic')],
//                ['1', Widget.Icon('audio-volume-low-symbolic')],
//                ['0', Widget.Icon('audio-volume-muted-symbolic')],
//            ],
//            connections: [[Audio, self => {
//                if (!Audio.speaker)
//                    return;
//
//                if (Audio.speaker.isMuted) {
//                    self.shown = '0';
//                    return;
//                }
//
//                const show = [101, 67, 34, 1, 0].find(
//                    threshold => threshold <= Audio.speaker.volume * 100);
//
//                self.shown = `${show}`;
//            }, 'speaker-changed']],
//        }),
//        Widget.Slider({
//            hexpand: true,
//            drawValue: false,
//            onChange: ({ value }) => Audio.speaker.volume = value,
//            connections: [[Audio, self => {
//                self.value = Audio.speaker?.volume || 0;
//            }, 'speaker-changed']],
//        }),
//    ],
//});
//
//const MediaWidget = () => Widget.Button({
//    className: 'media',
//    onPrimaryClick: () => Mpris.getPlayer('')?.playPause(),
//    onScrollUp: () => Mpris.getPlayer('')?.next(),
//    onScrollDown: () => Mpris.getPlayer('')?.previous(),
//    child: Widget.Label({
//        connections: [[Mpris, self => {
//            const mpris = Mpris.getPlayer('');
//            // mpris player can be undefined
//            if (mpris)
//                self.label = `${mpris.trackArtists.join(', ')} - ${mpris.trackTitle}`;
//            else
//                self.label = 'Nothing is playing';
//        }]],
//    }),
//});
//
//const SystemTrayWidget = () => Widget.Box({
//    connections: [[SystemTray, self => {
//        self.children = SystemTray.items.map(item => Widget.Button({
//            child: Widget.Icon({ binds: [['icon', item, 'icon']] }),
//            onPrimaryClick: (_, event) => item.activate(event),
//            onSecondaryClick: (_, event) => item.openMenu(event),
//            binds: [['tooltip-markup', item, 'tooltip-markup']],
//        }));
//    }]],
//});
//
function Power(){
    return Widget.Button({
        className: "power",
        child: Widget.Icon({
            icon: "NixOS"
        }),
    })
}






// Left widget
function Left(){
    return Widget.Box({
        spacing: 8,
        children: [
            Workspaces(),
        ],
    })
}

// Center widget
function Center(){
    return Widget.Box({
        className: 'center-widget',
        spacing: 8,
        children: [
            Clock(),
            //MediaWidget(),
        ],
    })
}

// Right widget
function Right(){
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            //VolumeWidget(),
            //NotificationsWidget(),
            //SystemTrayWidget(),
            Power(),
        ],
    })
}


// Bar 
function Bar(monitor = 1) {
    return Widget.Window({
        name: "bar-${monitor}",
        class_name: "bar",
        monitor,
        anchor: ["left", "top", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}

// AGS config
App.config({
    style: "./style.css",
    windows: [
        Bar(0)
    ],
    onConfigParsed: function() {
        // Auto reloading of CSS file
        Utils.monitorFile(
            './style.css',
            function(){
                const cssFile = './style.css'

                App.resetCss()
                App.applyCss(cssFile)
            },
        )
    },
})

